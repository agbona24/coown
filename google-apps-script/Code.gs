// ===========================================
// GOOGLE APPS SCRIPT - Copy this to script.google.com
// ===========================================
// 
// SETUP INSTRUCTIONS:
//
// 1. Go to https://script.google.com
// 2. Click "New Project"
// 3. Delete the default code and paste everything below
// 4. Update SHEET_ID with your Google Sheet ID
// 5. Run "initializeSheet" function first (creates headers)
// 6. Click "Deploy" > "New deployment"
// 7. Select type: "Web app"
// 8. Set "Execute as": Me
// 9. Set "Who has access": Anyone
// 10. Click "Deploy" and copy the Web App URL
// 11. Add URL to .env.local as NEXT_PUBLIC_GOOGLE_SCRIPT_URL
//
// ===========================================

// Replace with your Google Sheet ID (from the URL)
const SHEET_ID = '1h3hDVdIaJ6A9lP39LFSv2SPIYBy0Bfo_pC-g7GkdJyg';
const SHEET_NAME = 'Sheet1';

// Headers for the sheet
const HEADERS = [
  'Timestamp',
  'User Type', 
  'Full Name',
  'Email',
  'Phone',
  'Investment Budget',
  'Agency Name',
  'Experience'
];

// ⭐ RUN THIS FIRST - Creates the sheet and headers
function initializeSheet() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Try to get existing sheet or create new one
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      Logger.log('✅ Created new sheet: ' + SHEET_NAME);
    } else {
      Logger.log('ℹ️ Sheet already exists: ' + SHEET_NAME);
    }
    
    // Set headers in first row
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);
    
    // Style the headers
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
    
    // Set column widths for better readability
    sheet.setColumnWidth(1, 180); // Timestamp
    sheet.setColumnWidth(2, 130); // User Type
    sheet.setColumnWidth(3, 180); // Full Name
    sheet.setColumnWidth(4, 220); // Email
    sheet.setColumnWidth(5, 140); // Phone
    sheet.setColumnWidth(6, 140); // Investment Budget
    sheet.setColumnWidth(7, 160); // Agency Name
    sheet.setColumnWidth(8, 120); // Experience
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    Logger.log('✅ Headers created successfully!');
    Logger.log('✅ Sheet is ready. Now deploy as Web App.');
    
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    Logger.log('Make sure SHEET_ID is correct and you have edit access.');
  }
}

// Handle GET requests (used for form submission to avoid CORS issues)
function doGet(e) {
  // If parameters are provided, treat as form submission
  if (e.parameter && e.parameter.fullName) {
    return handleFormSubmission(e.parameter);
  }
  
  // Otherwise return status message
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: 'Coown Waitlist API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // Parse the incoming data
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }
    
    return handleFormSubmission(data);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleFormSubmission(data) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Sheet not found. Run initializeSheet first.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Append row to sheet
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.userType || '',
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.investmentBudget || '',
      data.agencyName || '',
      data.experience || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data added successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - run this to verify sheet access
function testSheetAccess() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (sheet) {
      Logger.log('✅ Sheet access successful!');
      Logger.log('Sheet name: ' + sheet.getName());
      Logger.log('Last row: ' + sheet.getLastRow());
    } else {
      Logger.log('❌ Sheet not found. Run initializeSheet first.');
    }
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    Logger.log('Check SHEET_ID and sharing permissions.');
  }
}
