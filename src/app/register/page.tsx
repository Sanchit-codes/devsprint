'use client';

import * as React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useState } from "react";
import styles from './Register.module.scss';

const seminars = [
  { value: 'ai-future', label: 'AI & Future of Technology' },
  { value: 'web3-blockchain', label: 'Web3 & Blockchain Revolution' },
  { value: 'cloud-devops', label: 'Cloud Computing & DevOps' },
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  enrollment: z.string().min(5, "Enrollment number is required."),
  branch: z.string().min(2, "Branch is required."),
  year: z.enum(['1st', '2nd', '3rd', '4th']),
  seminars: z.array(z.string()).min(1, "Please select at least one seminar."),
});

export default function RegisterPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ title: '', description: '', type: 'error' as 'success' | 'error' | 'info' });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
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
    console.log('[RegisterPage] - Form submitted with values:', values);
    
    setIsSubmitting(true);
    showToastMessage("Processing...", "Validating your information", "info");
    
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('enrollment', values.enrollment);
    formData.append('branch', values.branch);
    formData.append('year', values.year);
    formData.append('seminars', JSON.stringify(values.seminars));
    console.log('[RegisterPage] - FormData created, sending to API...');

    try {
      showToastMessage("Submitting...", "Sending your registration to the server", "info");
      
      const response = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });
      console.log('[RegisterPage] - API response received:', response);

      const result = await response.json();
      console.log('[RegisterPage] - API response body parsed:', result);

      if (response.ok) {
        showToastMessage("Success!", "You have been successfully registered for the selected seminars!", "success");
        setTimeout(() => {
          setShowSuccessDialog(true);
        }, 500);
        console.log('[RegisterPage] - Registration successful.');
        form.reset();
      } else {
        showToastMessage("Registration Failed", result.error || "An unexpected error occurred.", "error");
        console.error('[RegisterPage] - Registration failed:', result.error);
      }
    } catch (error) {
        showToastMessage("Registration Failed", "An error occurred while submitting the form.", "error");
        console.error('[RegisterPage] - An exception occurred during fetch:', error);
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <>
    <div className={styles['register']}>
      <Header />
      <main className={styles['register__main']}>
          <div className={styles['register__container']}>
            <div className={styles['register__heading-section']}>
              <div className="dual-heading">
                <div className="heading-back">REGISTER NOW</div>
                <h2 className="heading-front">DevSprint Seminars 2024</h2>
              </div>
            </div>
            
            <div className={styles['register__grid']}>
              <div className={styles['register__left']}>
                <div className={styles['register__about']}>
                  <h2>About DevSprint Seminars</h2>
                  <div className={styles['register__about-content']}>
                    <div>
                      <p className="font-bold">🎓 Join us for an enlightening series of technical seminars!</p>
                      <p>DevSprint Seminars bring together industry experts and thought leaders to share their knowledge and insights on cutting-edge technologies.</p>
                      
                      <p className="font-bold">📚 Available Seminars:</p>
                      <ul>
                        <li><strong>AI & Future of Technology:</strong> Explore the latest advancements in artificial intelligence, machine learning, and emerging tech trends</li>
                        <li><strong>Web3 & Blockchain Revolution:</strong> Dive deep into decentralized systems, blockchain applications, and the future of the internet</li>
                        <li><strong>Cloud Computing & DevOps:</strong> Master modern infrastructure, deployment practices, and cloud-native technologies</li>
                      </ul>
                      
                      <p className="font-bold">✨ What You&apos;ll Get:</p>
                      <ul>
                        <li>Certificates of participation</li>
                        <li>Networking opportunities with industry experts</li>
                        <li>Q&A sessions with speakers</li>
                        <li>Learning materials and resources</li>
                        <li>Refreshments during breaks</li>
                      </ul>
                      
                      <p className="font-bold">📋 Registration Details:</p>
                      <ul>
                        <li>Open to all college students</li>
                        <li>Select one or more seminars</li>
                        <li>Limited seats available</li>
                        <li>No registration fee</li>
                      </ul>
                      
                      <p>📅 <strong>Event Date:</strong> 20th-21st January 2024</p>
                      <p>📍 <strong>Venue:</strong> MITS Campus, Gwalior</p>
                      
                      <p>For queries, contact us at:</p>
                      <p>📧 <a href="mailto:gdg@mits.ac.in">gdg@mits.ac.in</a></p>
                      <p>📞 <a href="tel:+919876543210">+91 98765 43210</a></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles['register__card']}>
                <div className={styles['register__card-header']}>
                  <h1 className={styles['register__card-title']}>Seminar Registration</h1>
                </div>
                <div className={styles['register__card-content']}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className={styles['register__form']}>
                        
                        <h4 className={styles['register__section-title']}>Personal Information</h4>
                        
                        <div className={styles['register__form-field']}>
                            <label className={styles['register__label']}>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className={styles['register__input']}
                                {...form.register("name")}
                            />
                            {form.formState.errors.name && (
                                <span className={styles['register__error']}>
                                    {form.formState.errors.name.message}
                                </span>
                            )}
                        </div>

                        <div className={styles['register__form-field']}>
                            <label className={styles['register__label']}>Email Address</label>
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                className={styles['register__input']}
                                {...form.register("email")}
                            />
                            {form.formState.errors.email && (
                                <span className={styles['register__error']}>
                                    {form.formState.errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className={styles['register__form-field']}>
                            <label className={styles['register__label']}>Enrollment Number</label>
                            <input
                                type="text"
                                placeholder="e.g., 0901CS211234"
                                className={styles['register__input']}
                                {...form.register("enrollment")}
                            />
                            {form.formState.errors.enrollment && (
                                <span className={styles['register__error']}>
                                    {form.formState.errors.enrollment.message}
                                </span>
                            )}
                        </div>

                        <div className={styles['register__form-field']}>
                            <label className={styles['register__label']}>Branch</label>
                            <select
                                className={styles['register__select']}
                                {...form.register("branch")}
                            >
                                <option value="">Select branch</option>
                                <option value="Civil">Civil Engineering</option>
                                <option value="Mech">Mechanical Engineering</option>
                                <option value="Elec">Electrical Engineering</option>
                                <option value="EC">Electronics Engineering</option>
                                <option value="Arch">Architecture</option>
                                <option value="CSE">Computer Science & Engineering</option>
                                <option value="Chem">Chemical Engineering</option>
                                <option value="IT">Information Technology</option>
                                <option value="ET">Electronics & Telecommunication Engineering</option>
                                <option value="AIR">Information Technology (Artificial Intelligence and Robotics)</option>
                                <option value="IOT-1">Internet of Things (IoT)</option>
                                <option value="MAC">Mathematics and Computing</option>
                                <option value="IOT-2">Internet of Things</option>
                                <option value="AIDS">Artificial Intelligence (AI) and Data Science</option>
                                <option value="AIML">Artificial Intelligence and Machine Learning</option>
                                <option value="CSD">Computer Science and Design</option>
                                <option value="CSBS">Computer Science & Business Systems</option>
                                <option value="AI">Artificial Intelligence (AI)</option>
                                <option value="Other">Other</option>
                            </select>
                            {form.formState.errors.branch && (
                                <span className={styles['register__error']}>
                                    {form.formState.errors.branch.message}
                                </span>
                            )}
                        </div>

                        <div className={styles['register__form-field']}>
                            <label className={styles['register__label']}>Year of Study</label>
                            <select
                                className={styles['register__select']}
                                {...form.register("year")}
                            >
                                <option value="1st">1st Year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                            </select>
                            {form.formState.errors.year && (
                                <span className={styles['register__error']}>
                                    {form.formState.errors.year.message}
                                </span>
                            )}
                        </div>
        
                        <h4 className={styles['register__section-title']}>Select Seminars</h4>
                        <p className={styles['register__help-text']}>Choose one or more seminars you&apos;d like to attend</p>
                        
                        <div className={styles['register__checkbox-group']}>
                            {seminars.map((seminar) => (
                                <label key={seminar.value} className={styles['register__checkbox-label']}>
                                    <input
                                        type="checkbox"
                                        value={seminar.value}
                                        className={styles['register__checkbox']}
                                        {...form.register("seminars")}
                                    />
                                    <span className={styles['register__checkbox-text']}>{seminar.label}</span>
                                </label>
                            ))}
                        </div>
                        {form.formState.errors.seminars && (
                            <span className={styles['register__error']}>
                                {form.formState.errors.seminars.message}
                            </span>
                        )}

                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className={styles['register__button']}
                    >
                      {isSubmitting ? "Submitting..." : "Register for Seminars"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </main>
      <Footer />
    </div>

    {/* Success Modal */}
    {showSuccessDialog && (
      <div className={styles['register__modal-overlay']} onClick={() => setShowSuccessDialog(false)}>
        <div className={styles['register__modal']} onClick={(e) => e.stopPropagation()}>
          <div className={styles['register__modal-header']}>
            <h2>Registration Successful!</h2>
            <button 
              onClick={() => setShowSuccessDialog(false)}
              className={styles['register__modal-close']}
            >
              ×
            </button>
          </div>
          <div className={styles['register__modal-body']}>
            <p>You have been successfully registered for the selected seminars!</p>
            <p>Check your email for confirmation and seminar details including venue and timings.</p>
            <p>See you at the event!</p>
          </div>
          <div className={styles['register__modal-footer']}>
            <button 
              onClick={() => setShowSuccessDialog(false)}
              className={styles['register__button']}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Toast Notification */}
    {showToast && (
      <div className={`${styles['register__toast']} ${styles[`register__toast--${toastMessage.type}`]}`}>
        <div className={styles['register__toast-icon']}>
          {toastMessage.type === 'info' && <div className={styles['register__toast-spinner']}></div>}
          {toastMessage.type === 'success' && <span>✓</span>}
          {toastMessage.type === 'error' && <span>✕</span>}
        </div>
        <div className={styles['register__toast-content']}>
          <strong>{toastMessage.title}</strong>
          <p>{toastMessage.description}</p>
        </div>
      </div>
    )}
    </>
  );
}
