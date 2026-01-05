// Google Sheets Integration via Google Apps Script
// This sends form data to a Google Apps Script Web App which writes to Google Sheets

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

interface WaitlistFormData {
  userType: 'realtor' | 'coowner';
  fullName: string;
  email: string;
  phone: string;
  investmentBudget?: string;
  agencyName?: string;
  experience?: string;
}

interface GoogleSheetsResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function sendToGoogleSheets(formData: WaitlistFormData): Promise<GoogleSheetsResponse> {
  if (!GOOGLE_SCRIPT_URL) {
    console.error('Google Script URL not configured');
    return { success: false, error: 'Server configuration error' };
  }

  try {
    const payload = {
      timestamp: new Date().toISOString(),
      userType: formData.userType === 'coowner' ? 'Property Co-Owner' : 'Realtor',
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      investmentBudget: formData.userType === 'coowner' ? formData.investmentBudget || '' : '',
      agencyName: formData.userType === 'realtor' ? formData.agencyName || '' : '',
      experience: formData.userType === 'realtor' ? formData.experience || '' : '',
    };

    // Use GET with URL parameters to avoid CORS issues
    const params = new URLSearchParams(payload as Record<string, string>);
    const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Google Sheets submission error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit form' 
    };
  }
}

// Alternative: Use with CORS enabled (if Apps Script is configured for it)
export async function sendToGoogleSheetsWithResponse(formData: WaitlistFormData): Promise<GoogleSheetsResponse> {
  if (!GOOGLE_SCRIPT_URL) {
    console.error('Google Script URL not configured');
    return { success: false, error: 'Server configuration error' };
  }

  try {
    const payload = {
      timestamp: new Date().toISOString(),
      userType: formData.userType === 'coowner' ? 'Property Co-Owner' : 'Realtor',
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      investmentBudget: formData.userType === 'coowner' ? formData.investmentBudget || '' : '',
      agencyName: formData.userType === 'realtor' ? formData.agencyName || '' : '',
      experience: formData.userType === 'realtor' ? formData.experience || '' : '',
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain', // Avoids CORS preflight
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Google Sheets submission error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit form' 
    };
  }
}
