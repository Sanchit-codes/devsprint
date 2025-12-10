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
      range: 'A:H', // Get all columns
    });

    const rows = existingData.data.values || [];
    let existingRowIndex = -1;
    let existingSeminars: string[] = [];
    
    rows.forEach((row, index) => {
      // Skip header row (index 0)
      if (index === 0) return;
      if (row[1]?.toLowerCase() === email.toLowerCase()) {
        existingRowIndex = index + 1; // +1 because sheet rows are 1-indexed
        existingSeminars = row[6] ? JSON.parse(row[6]) : [];
      }
    });

    if (existingRowIndex > 0) {
      console.log('[/api/register] - Email already registered:', email);
      
      // Parse new seminars
      const newSeminars: string[] = JSON.parse(seminars);
      
      // Find seminars to add (present in new but not in existing)
      const seminarsToAdd = newSeminars.filter(s => !existingSeminars.includes(s));
      
      if (seminarsToAdd.length === 0) {
        console.log('[/api/register] - User already registered for all selected seminars');
        return NextResponse.json({ 
          error: 'You are already registered for all selected seminars.' 
        }, { status: 409 });
      }
      
      // Merge seminars (existing + new ones)
      const mergedSeminars = Array.from(new Set([...existingSeminars, ...newSeminars]));
      
      console.log('[/api/register] - Updating registration with new seminars:', seminarsToAdd);
      
      // Update the existing row
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `G${existingRowIndex}:H${existingRowIndex}`, // Update seminars and timestamp
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[JSON.stringify(mergedSeminars), new Date().toISOString()]],
        },
      });
      
      // Get seminar names for the response
      const seminarMap: { [key: string]: string } = {
        'ai-future': 'AI & Future of Technology',
        'web3-blockchain': 'Web3 & Blockchain Revolution',
        'cloud-devops': 'Cloud Computing & DevOps',
      };
      const addedSeminarNames = seminarsToAdd.map(s => seminarMap[s] || s);
      
      console.log('[/api/register] - Registration updated successfully');
      return NextResponse.json({ 
        success: true, 
        updated: true,
        addedSeminars: addedSeminarNames,
        message: `Registration updated! You have been added to: ${addedSeminarNames.join(', ')}`
      });
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

      const emailContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevSprint 2025 Registration Confirmed</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px 0; text-align: center;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header Image -->
          <tr>
            <td style="background-color: #f7f7f7; padding: 20px 0;">
              <img src="https://i.kwin.in/r/mizppfnxt51.png" alt="DevSprint 2025 Header Graphic" style="width: 100%; max-width: 600px; height: auto; display: block;">
            </td>
          </tr>
          
          <!-- Content Area -->
          <tr>
            <td style="padding: 20px; text-align: center;">
              
              <!-- Title -->
              <h1 style="color: #333333; font-size: 24px; margin-top: 0; margin-bottom: 5px;">DevSprint</h1>
              <p style="color: #555555; font-size: 16px; margin-top: 0; margin-bottom: 20px;">2025</p>

              <!-- Confirmation Badge -->
              <div style="margin-bottom: 30px;">
                <span style="display: inline-block; padding: 8px 15px; border: 2px solid #5cb85c; color: #5cb85c; font-weight: bold; border-radius: 5px; background-color: #eaf6eaf0;">
                  Registration Confirmed
                </span>
              </div>

              <!-- Message -->
              <p style="color: #333333; font-size: 16px; line-height: 1.5; text-align: left; margin-bottom: 20px;">
                Hi <strong>${name}</strong>,
                <br><br>
                You have successfully registered for <strong>GDG DevSprint 2025</strong>! We're excited to have you join us for this amazing event.
              </p>

              <!-- Details Box -->
              <div style="border: 1px solid #dddddd; padding: 15px; border-radius: 5px; text-align: left; margin-bottom: 30px;">
                <p style="margin: 5px 0; color: #333333;"><span style="font-weight: bold;">Name:</span> ${name}</p>
                <p style="margin: 5px 0; color: #333333;"><span style="font-weight: bold;">Enrollment No:</span> ${enrollment}</p>
                <p style="margin: 5px 0; color: #333333;"><span style="font-weight: bold;">Email:</span> ${email}</p>
                <p style="margin: 5px 0; color: #333333;"><span style="font-weight: bold;">Branch:</span> ${branch}</p>
                <p style="margin: 5px 0; color: #333333;"><span style="font-weight: bold;">Year:</span> ${year}</p>
                <p style="margin: 5px 0; color: #333333;"><span style="font-weight: bold;">Date:</span> Jan 5-6, 2026</p>
                <p style="margin: 5px 0; color: #333333;"><span style="font-weight: bold;">Venue:</span> MITS Campus, Gwalior</p>
              </div>

              <!-- Registered Events -->
              <div style="margin-bottom: 30px;">
                <h2 style="color: #333333; font-size: 18px; font-weight: bold; margin-top: 0; margin-bottom: 15px; text-align: left;">Your Registered Events:</h2>
                ${seminarItemsHtml}
              </div>

              <!-- Action Button -->
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="display: inline-block; background-color: #4285f4; color: #ffffff; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 16px; margin-bottom: 30px;">
                View Next Steps & Schedule
              </a>

              <!-- Need Help Section -->
              <div style="background-color: #f7f7f7; border: 1px solid #eeeeee; padding: 20px; border-radius: 5px; margin-bottom: 30px;">
                <p style="font-weight: bold; color: #333333; font-size: 18px; margin-top: 0; margin-bottom: 10px;">Need Help?</p>
                <p style="color: #555555; font-size: 14px; margin-bottom: 15px;">
                  If you have any questions or need to make changes to your registration, please contact us:
                </p>
                <p style="margin: 5px 0;">
                  <a href="mailto:gdgoncampusmits@gmail.com" style="color: #4285f4; text-decoration: none;">&#9993; gdgoncampusmits@gmail.com</a>
                </p>
                <p style="margin: 5px 0;">
                  <a href="tel:+91 90391 41772" style="color: #4285f4; text-decoration: none;">&#9742; +91 90391 41772</a>
                </p>
              </div>

              <!-- Footer -->
              <p style="color: #555555; font-size: 14px; margin-bottom: 5px;">
                We look forward to seeing you at the event! &#127881;
              </p>
              <p style="font-weight: bold; color: #333333; font-size: 16px; margin-top: 5px;">
                Best regards,<br>
                <span style="color: #4285f4;">GDG MITS Team</span>
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

      const subject = 'Registration Confirmed - DevSprint 2025';
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
}