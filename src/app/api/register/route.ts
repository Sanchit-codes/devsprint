
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  console.log('[/api/register] - POST request received.');
  try {
    const formData = await req.formData();
    console.log('[/api/register] - FormData parsed.');

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const enrollment = formData.get('enrollment') as string;
    const branch = formData.get('branch') as string;
    const year = formData.get('year') as string;
    const seminars = formData.get('seminars') as string;

    console.log('[/api/register] - Fields extracted:', { name, email, enrollment, branch, year, seminars });

    if (!name || !email || !enrollment || !branch || !year || !seminars) {
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
        [name, email, enrollment, branch, year, seminars, new Date().toISOString()]
    ];
    
    console.log('[/api/register] - Appending values to spreadsheet:', values);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A1:G1', // Updated range for 7 columns (name, email, enrollment, branch, year, seminars, timestamp)
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('[/api/register] - Successfully appended to spreadsheet:', response.data);
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