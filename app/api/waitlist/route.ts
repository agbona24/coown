import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Waitlist';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userType, fullName, email, phone, investmentBudget, agencyName, experience } = body;

    // Validate required fields
    if (!userType || !fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for Airtable configuration
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error('Airtable credentials not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Prepare Airtable record
    const fields: Record<string, string> = {
      'User Type': userType === 'coowner' ? 'Property Co-Owner' : 'Realtor',
      'Full Name': fullName,
      'Email': email,
      'Phone': phone,
      'Submitted At': new Date().toISOString(),
    };

    // Add type-specific fields
    if (userType === 'coowner' && investmentBudget) {
      fields['Investment Budget'] = investmentBudget;
    }
    if (userType === 'realtor') {
      if (agencyName) fields['Agency Name'] = agencyName;
      if (experience) fields['Experience'] = experience;
    }

    // Submit to Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [{ fields }],
        }),
      }
    );

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.json();
      console.error('Airtable error:', errorData);
      return NextResponse.json(
        { error: 'Failed to submit to waitlist' },
        { status: 500 }
      );
    }

    const data = await airtableResponse.json();

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist',
      recordId: data.records?.[0]?.id,
    });

  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
