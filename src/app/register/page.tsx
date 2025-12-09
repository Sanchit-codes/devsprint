'use client';

import * as React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useState } from "react";
import styles from './Register.module.scss';
import { GoogleMaterialIcon, LoadingSpinner } from '@/components/ui/Icons';

const seminars = [
  {
    value: 'Info Session',
    label: 'Info Session + Submission Kickoff',
    icon: '',
    description: 'Explore AI advancements and emerging tech trends'
  },
  {
    value: 'Expert Session 1',
    label: 'Expert Session 1 — Samarth Sharma',
    icon: '',
    description: 'Dive into decentralized systems and blockchain applications'
  },
  {
    value: 'Expert Session 2',
    label: 'Expert Session 2 — Balavigneshwaran Manogaran',
    icon: '',
    description: 'Master modern infrastructure and cloud-native technologies'
  },
  {
    value: 'Expert Session 3',
    label: 'Expert Session 3 — Kartikey Verma',
    icon: '',
    description: 'Master modern infrastructure and cloud-native technologies'
  },
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string()
    .email("Please enter a valid email address.")
    .refine(
      (email) => {
        const commonProviders = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'live.com', 'icloud.com', 'protonmail.com', 'aol.com'];
        const domain = email.split('@')[1]?.toLowerCase();
        return !commonProviders.includes(domain);
      },
      "Please use your institutional email address (not Gmail, Yahoo, Outlook, etc.)"
    ),
  mobile: z.string()
    .min(10, "Mobile number must be at least 10 digits.")
    .max(15, "Mobile number must not exceed 15 digits.")
    .regex(/^[0-9+\-\s()]*$/, "Please enter a valid mobile number."),
  enrollment: z.string().min(5, "Enrollment number is required."),
  branch: z.string().min(2, "Branch is required."),
  year: z.enum(['1st', '2nd', '3rd', '4th']),
  seminars: z.array(z.string()).min(1, "Please select at least one seminar."),
});

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: '',
    description: '',
    type: 'error' as 'success' | 'error' | 'info'
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      enrollment: "",
      branch: "",
      year: "2nd",
      seminars: [],
    },
  });

  const showToastMessage = (title: string, description: string, type: 'success' | 'error' | 'info' = 'error') => {
    setToastMessage({ title, description, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    showToastMessage("Processing...", "Validating your information", "info");

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('mobile', values.mobile);
    formData.append('enrollment', values.enrollment);
    formData.append('branch', values.branch);
    formData.append('year', values.year);
    formData.append('seminars', JSON.stringify(values.seminars));

    try {
      showToastMessage("Submitting...", "Sending your registration to the server", "info");

      const response = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        if (result.updated) {
          // Registration was updated with new seminars
          const addedSeminars = result.addedSeminars?.join(', ') || 'selected seminars';
          showToastMessage(
            "Registration Updated!", 
            `You have been added to: ${addedSeminars}`, 
            "success"
          );
        } else {
          // New registration
          showToastMessage("Success!", "Registration completed successfully!", "success");
        }
        setTimeout(() => {
          setShowSuccessDialog(true);
        }, 500);
        form.reset();
      } else {
        showToastMessage("Registration Failed", result.error || "An unexpected error occurred.", "error");
      }
    } catch (error) {
      showToastMessage("Registration Failed", "An error occurred while submitting the form.", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.register}>
      <Header />

      <main className={styles.main}>

        <div className={styles.container}>
          <div className={styles.layout}>
            {/* Left Column - Form */}
            <div className={styles.formColumn}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  
                  <div>
                    <h2 className={styles.formTitle}>Registration Form</h2>
                    <p className={styles.formSubtitle}>Fill in your details to secure your spot</p>
                  </div>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                  {/* Personal Information Section */}
                  <div className={styles.formSection}>
                    <div className={styles.sectionHeader}>
                      
                      <h3 className={styles.sectionTitle}>Personal Information</h3>
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className={`${styles.input} ${form.formState.errors.name ? styles.inputError : ''}`}
                          {...form.register("name")}
                        />
                        {form.formState.errors.name && (
                          <span className={styles.error}>
                            <GoogleMaterialIcon name="error" size={14} />
                            {form.formState.errors.name.message}
                          </span>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="your.email@college.edu"
                          className={`${styles.input} ${form.formState.errors.email ? styles.inputError : ''}`}
                          {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                          <span className={styles.error}>
                           
                            {form.formState.errors.email.message}
                          </span>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          className={`${styles.input} ${form.formState.errors.mobile ? styles.inputError : ''}`}
                          {...form.register("mobile")}
                        />
                        {form.formState.errors.mobile && (
                          <span className={styles.error}>
                           
                            {form.formState.errors.mobile.message}
                          </span>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          
                          Enrollment Number
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 0901CS211234"
                          className={`${styles.input} ${form.formState.errors.enrollment ? styles.inputError : ''}`}
                          {...form.register("enrollment")}
                        />
                        {form.formState.errors.enrollment && (
                          <span className={styles.error}>
                            
                            {form.formState.errors.enrollment.message}
                          </span>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          
                          Branch
                        </label>
                        <select
                          className={`${styles.select} ${form.formState.errors.branch ? styles.inputError : ''}`}
                          {...form.register("branch")}
                        >
                          <option value="">Select your branch</option>
                          <option value="CSE">Computer Science & Engineering</option>
                          <option value="IT">Information Technology</option>
                          <option value="AIR">AI & Robotics</option>
                          <option value="AIDS">AI & Data Science</option>
                          <option value="AIML">AI & Machine Learning</option>
                          <option value="EC">Electronics Engineering</option>
                          <option value="Other">Other</option>
                        </select>
                        {form.formState.errors.branch && (
                          <span className={styles.error}>
                            
                            {form.formState.errors.branch.message}
                          </span>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          
                          Year of Study
                        </label>
                        <div className={styles.radioGroup}>
                          {(['1st', '2nd', '3rd', '4th'] as const).map((year) => (
                            <label key={year} className={styles.radioLabel}>
                              <input
                                type="radio"
                                value={year}
                                className={styles.radio}
                                {...form.register("year")}
                              />
                              <span className={styles.radioCustom}></span>
                              <span className={styles.radioText}>{year} Year</span>
                            </label>
                          ))}
                        </div>
                        {form.formState.errors.year && (
                          <span className={styles.error}>
                            <GoogleMaterialIcon name="error" size={14} />
                            {form.formState.errors.year.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Seminars Section */}
                  <div className={styles.formSection}>
                    <div className={styles.sectionHeader}>

                      <h3 className={styles.sectionTitle}>Select Seminars</h3>
                    </div>
                    <p className={styles.sectionDescription}>Choose one or more seminars you&apos;d like to attend</p>

                    <div className={styles.seminarsGrid}>
                      {seminars.map((seminar) => {
                        const isChecked = form.watch('seminars').includes(seminar.value);
                        return (
                          <label
                            key={seminar.value}
                            className={`${styles.seminarCard} ${isChecked ? styles.seminarCardChecked : ''}`}
                          >
                            <input
                              type="checkbox"
                              value={seminar.value}
                              className={styles.checkbox}
                              {...form.register("seminars")}
                            />
                            <div className={styles.seminarIcon}>{seminar.icon}</div>
                            <div className={styles.seminarContent}>
                              <h4 className={styles.seminarTitle}>{seminar.label}</h4>
                              <p className={styles.seminarDescription}>{seminar.description}</p>
                            </div>
                            <div className={styles.checkmark}>
                              <GoogleMaterialIcon name="check_circle" size={24} />
                            </div>
                          </label>
                        );
                      })}
                    </div>
                    {form.formState.errors.seminars && (
                      <span className={styles.error}>
                        <GoogleMaterialIcon name="error" size={14} />
                        {form.formState.errors.seminars.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitButton}
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner />
                        Processing...
                      </>
                    ) : (
                      <>
                        {/* <GoogleMaterialIcon name="how_to_reg" size={20} /> */}
                        Register for Seminars
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column - Info */}
            <div className={styles.infoColumn}>
              <div className={styles.infoCard}>
                <div className={styles.infoHeader}>
                  <h3 className={styles.infoTitle}>Event Details</h3>
                  <div className={styles.dateBadge}>
                    {/* <GoogleMaterialIcon name="calendar_today" size={16} /> */}
                    20-21 Jan 2024
                  </div>
                </div>

                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    
                    <div>
                      <span className={styles.detailLabel}>Platform</span>
                      <span className={styles.detailValue}>Google Meet</span>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    
                    <div>
                      <span className={styles.detailLabel}>Time</span>
                      <span className={styles.detailValue}>Info Session: 8:30PM - 9:30 PM</span>
                      <span className={styles.detailValue}>Expert Session 1: 8:30 PM – 10:00 PM </span>
                      <span className={styles.detailValue}>Expert Session 2: 11:30 AM – 1:00 PM </span>
                      <span className={styles.detailValue}>Expert Session 3: 8:30 PM – 10:00 PM</span>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    
                    <div>
                      <span className={styles.detailLabel}>Fee</span>
                      <span className={styles.detailValue}>Free Registration</span>
                    </div>
                  </div>
                </div>

                <div className={styles.benefits}>
                  <h4 className={styles.benefitsTitle}>What You&apos;ll Get</h4>
                  <ul className={styles.benefitsList}>
                    <li>
                      
                      Certificate of Participation
                    </li>
                    <li>
                      
                      Networking with Experts
                    </li>
                    <li>
                      
                      Q&A Sessions
                    </li>
                  </ul>
                </div>

                <div className={styles.contact}>
                  <h4 className={styles.contactTitle}>Contact Information</h4>
                  <div className={styles.contactLinks}>
                    <a href="mailto:gdg@mits.ac.in" className={styles.contactLink}>
                      <GoogleMaterialIcon name="person" size={18} />
                      Mayank Padhi
                    </a>
                    <a href="tel:+919876543210" className={styles.contactLink}>
                      <GoogleMaterialIcon name="call" size={18} />
                      +91 90391 41772
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div className={styles.successIcon}>
                <GoogleMaterialIcon name="check_circle" size={48} />
              </div>
              <h2 className={styles.modalTitle}>Registration Successful!</h2>
              <button
                onClick={() => setShowSuccessDialog(false)}
                className={styles.modalClose}
              >
                <GoogleMaterialIcon name="close" size={24} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>You have been successfully registered for the selected seminars!</p>
              <p>Check your email for confirmation and seminar details including venue and timings.</p>
              <div className={styles.modalActions}>
                <button
                  onClick={() => setShowSuccessDialog(false)}
                  className={styles.modalButton}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className={`${styles.toast} ${styles[`toast--${toastMessage.type}`]}`}>
          <div className={styles.toastIcon}>
            {toastMessage.type === 'info' && <LoadingSpinner />}
            {toastMessage.type === 'success' && <GoogleMaterialIcon name="check_circle" size={24} />}
            {toastMessage.type === 'error' && <GoogleMaterialIcon name="error" size={24} />}
          </div>
          <div className={styles.toastContent}>
            <strong className={styles.toastTitle}>{toastMessage.title}</strong>
            <p className={styles.toastDescription}>{toastMessage.description}</p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className={styles.toastClose}
          >
            <GoogleMaterialIcon name="close" size={18} />
          </button>
        </div>
      )}
    </div>
  );
}