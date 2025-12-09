
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  console.log('[/api/register] - POST request received.');
  try {
    const formData = await req.formData();
    console.log('[/api/register] - FormData parsed.');

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const mobile = formData.get('mobile') as string;
    const enrollment = formData.get('enrollment') as string;
    const branch = formData.get('branch') as string;
    const year = formData.get('year') as string;
    const seminars = formData.get('seminars') as string;

    console.log('[/api/register] - Fields extracted:', { name, email, mobile, enrollment, branch, year, seminars });

    if (!name || !email || !mobile || !enrollment || !branch || !year || !seminars) {
      console.error('[/api/register] - Missing required fields.');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('[/api/register] - Authenticating with Google OAuth...');
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    console.log('[/api/register] - Setting refresh token...');
    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    console.log('[/api/register] - Attempting to get new access token...');
    const { token: accessToken } = await oauth2Client.getAccessToken();
    if (!accessToken) {
        console.error('[/api/register] - Failed to retrieve access token. The refresh token might be invalid.');
        throw new Error('Failed to retrieve access token.');
    }
    console.log('[/api/register] - Google OAuth successful, access token obtained.');
    
    oauth2Client.setCredentials({ access_token: accessToken });

    console.log('[/api/register] - Connecting to Google Sheets...');
    const sheets = google.sheets({
      auth: oauth2Client,
      version: 'v4',
    });

    const gmail = google.gmail({
      auth: oauth2Client,
      version: 'v1',
    });

    // Check if email already exists
    console.log('[/api/register] - Checking for existing registration...');
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A:B', // Get name and email columns
    });

    const rows = existingData.data.values || [];
    const emailExists = rows.some((row, index) => {
      // Skip header row (index 0)
      if (index === 0) return false;
      return row[1]?.toLowerCase() === email.toLowerCase();
    });

    if (emailExists) {
      console.log('[/api/register] - Email already registered:', email);
      return NextResponse.json({ 
        error: 'You have already registered with this email address.' 
      }, { status: 409 });
    }

    const values = [
        [name, email, mobile, enrollment, branch, year, seminars, new Date().toISOString()]
    ];
    
    console.log('[/api/register] - Appending values to spreadsheet:', values);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A1:H1', // Updated range for 8 columns (name, email, mobile, enrollment, branch, year, seminars, timestamp)
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('[/api/register] - Successfully appended to spreadsheet:', response.data);
    
    // Send confirmation email
    console.log('[/api/register] - Preparing to send confirmation email...');
    try {
      const seminarList = JSON.parse(seminars);
      const seminarItems = seminarList.map((s: string) => {
        const seminarMap: { [key: string]: { name: string, color: string, icon: string } } = {
          'ai-future': { 
            name: 'AI & Future of Technology', 
            color: '#4285F4',
            icon: '🤖'
          },
          'web3-blockchain': { 
            name: 'Web3 & Blockchain Revolution', 
            color: '#EA4335',
            icon: '⛓️'
          },
          'cloud-devops': { 
            name: 'Cloud Computing & DevOps', 
            color: '#34A853',
            icon: '☁️'
          },
        };
        return seminarMap[s] || { name: s, color: '#666666', icon: '📚' };
      });

      const seminarItemsHtml = seminarItems.map((item: { name: string, color: string, icon: string }) => `
        <div style="background: ${item.color}15; border-left: 4px solid ${item.color}; padding: 16px; margin: 12px 0; border-radius: 8px;">
          <div style="font-size: 24px; margin-bottom: 8px;">${item.icon}</div>
          <div style="color: #1a1a1a; font-weight: 600; font-size: 16px;">${item.name}</div>
        </div>
      `).join('');

      const emailContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmed - DevSprint Seminars 2024</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header with Google Colors -->
          <tr>
            <td style="background: linear-gradient(135deg, #4285F4 0%, #EA4335 50%, #FBBC04 75%, #34A853 100%); padding: 4px 0;">
            </td>
          </tr>
          
          <!-- Logo/Brand Section -->
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center; background-color: #ffffff;">
              <h1 style="margin: 0; color: #1a1a1a; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                DevSprint Seminars
              </h1>
              <div style="margin-top: 8px; color: #666666; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">
                2024
              </div>
            </td>
          </tr>

          <!-- Success Badge -->
          <tr>
            <td style="padding: 0 40px 32px; text-align: center;">
              <div style="display: inline-block; background-color: #34A85315; border: 2px solid #34A853; border-radius: 50px; padding: 12px 24px;">
                <span style="color: #34A853; font-size: 20px; margin-right: 8px;">✓</span>
                <span style="color: #34A853; font-weight: 600; font-size: 16px;">Registration Confirmed</span>
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 0 40px;">
              <p style="color: #1a1a1a; font-size: 18px; line-height: 1.6; margin: 0 0 16px;">
                Dear <strong>${name}</strong>,
              </p>
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Thank you for registering for DevSprint Seminars 2024! We're excited to confirm your participation in the following seminar(s):
              </p>

              <!-- Seminars List -->
              ${seminarItemsHtml}

              <!-- Event Details Card -->
              <div style="background-color: #f8f9fa; border-radius: 12px; padding: 24px; margin: 32px 0;">
                <h2 style="color: #1a1a1a; font-size: 20px; margin: 0 0 20px; font-weight: 700;">Event Details</h2>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="font-size: 20px; margin-right: 12px;">📅</span>
                      <span style="color: #666666; font-size: 15px;">Date:</span>
                      <strong style="color: #1a1a1a; font-size: 15px; margin-left: 8px;">20th-21st January 2024</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="font-size: 20px; margin-right: 12px;">📍</span>
                      <span style="color: #666666; font-size: 15px;">Venue:</span>
                      <strong style="color: #1a1a1a; font-size: 15px; margin-left: 8px;">MITS Campus, Gwalior</strong>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Registration Details -->
              <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h3 style="color: #1a1a1a; font-size: 18px; margin: 0 0 16px; font-weight: 700;">Your Registration Details</h3>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 6px 0; color: #666666; font-size: 14px; width: 40%;">Name:</td>
                    <td style="padding: 6px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #666666; font-size: 14px;">Email:</td>
                    <td style="padding: 6px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #666666; font-size: 14px;">Mobile:</td>
                    <td style="padding: 6px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${mobile}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #666666; font-size: 14px;">Enrollment:</td>
                    <td style="padding: 6px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${enrollment}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #666666; font-size: 14px;">Branch:</td>
                    <td style="padding: 6px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${branch}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #666666; font-size: 14px;">Year:</td>
                    <td style="padding: 6px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${year}</td>
                  </tr>
                </table>
              </div>

              <!-- What to Expect -->
              <div style="margin: 32px 0;">
                <h3 style="color: #1a1a1a; font-size: 18px; margin: 0 0 16px; font-weight: 700;">What to Expect</h3>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #34A853; font-size: 18px; margin-right: 12px;">✓</span>
                      <span style="color: #666666; font-size: 15px;">Certificates of participation</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #34A853; font-size: 18px; margin-right: 12px;">✓</span>
                      <span style="color: #666666; font-size: 15px;">Networking opportunities with industry experts</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #34A853; font-size: 18px; margin-right: 12px;">✓</span>
                      <span style="color: #666666; font-size: 15px;">Interactive Q&A sessions with speakers</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #34A853; font-size: 18px; margin-right: 12px;">✓</span>
                      <span style="color: #666666; font-size: 15px;">Learning materials and resources</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #34A853; font-size: 18px; margin-right: 12px;">✓</span>
                      <span style="color: #666666; font-size: 15px;">Refreshments during breaks</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Important Reminders -->
              <div style="background-color: #FBBC0415; border-left: 4px solid #FBBC04; border-radius: 8px; padding: 20px; margin: 24px 0;">
                <h3 style="color: #1a1a1a; font-size: 16px; margin: 0 0 12px; font-weight: 700;">⚠️ Important Reminders</h3>
                <ul style="margin: 0; padding-left: 20px; color: #666666; font-size: 14px; line-height: 1.8;">
                  <li>Please arrive 15 minutes before the seminar start time</li>
                  <li>Carry a valid college ID card</li>
                  <li>Bring a notebook for taking notes</li>
                  <li>Follow the event code of conduct</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Contact Section -->
          <tr>
            <td style="padding: 32px 40px;">
              <div style="background-color: #f8f9fa; border-radius: 12px; padding: 24px; text-align: center;">
                <p style="color: #1a1a1a; font-size: 15px; margin: 0 0 12px; font-weight: 600;">Need Help?</p>
                <p style="color: #666666; font-size: 14px; margin: 0 0 16px;">If you have any questions or need to make changes to your registration, please contact us:</p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="text-align: center; padding: 6px 0;">
                      <a href="mailto:gdg@mits.ac.in" style="color: #4285F4; text-decoration: none; font-size: 14px; font-weight: 600;">
                        📧 gdg@mits.ac.in
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: center; padding: 6px 0;">
                      <a href="tel:+919876543210" style="color: #4285F4; text-decoration: none; font-size: 14px; font-weight: 600;">
                        📞 +91 98765 43210
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td style="padding: 0 40px 40px; text-align: center;">
              <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0 0 8px;">
                We look forward to seeing you at the event! 🎉
              </p>
              <p style="color: #1a1a1a; font-size: 15px; font-weight: 600; margin: 0;">
                Best regards,<br>
                <span style="color: #4285F4;">GDG MITS Team</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 24px 40px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #999999; font-size: 12px; margin: 0 0 8px;">
                © 2024 DevSprint Seminars. All rights reserved.
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0;">
                GDG MITS | Madhav Institute of Technology & Science, Gwalior
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

      const subject = '✓ Registration Confirmed - DevSprint Seminars 2024';
      const raw = [
        'Content-Type: text/html; charset="UTF-8"\n',
        'MIME-Version: 1.0\n',
        'Content-Transfer-Encoding: 7bit\n',
        `to: ${email}\n`,
        `subject: ${subject}\n\n`,
        emailContent
      ].join('');

      const encodedMessage = Buffer.from(raw)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      console.log('[/api/register] - Sending email via Gmail API...');
      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage,
        },
      });
      console.log('[/api/register] - Confirmation email sent successfully to:', email);
    } catch (emailError) {
      console.error('[/api/register] - Failed to send confirmation email:', emailError);
      // Don't fail the registration if email fails
    }

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('[/api/register] - An error occurred:', error);
    // Specifically check for 'invalid_grant'
    if (error.response?.data?.error === 'invalid_grant') {
        console.error('[/api/register] - Received "invalid_grant" error. The refresh token is likely expired or revoked. Please generate a new one.');
        return NextResponse.json({ error: 'Authentication failed with Google. The refresh token is invalid.', details: 'invalid_grant' }, { status: 500 });
    }
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}``