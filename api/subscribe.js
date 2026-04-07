// Vercel Serverless Function for GoHighLevel Integration
// This runs server-side to avoid CORS and keep credentials secure

export default async function handler(req, res) {
  // Get credentials from environment variables
  const GHL_API_KEY = process.env.GHL_API_KEY;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
  
  // Debug logging
  console.log('=== GHL API DEBUG ===');
  console.log('Env vars loaded:', {
    hasApiKey: !!GHL_API_KEY,
    hasLocationId: !!GHL_LOCATION_ID,
    apiKeyLength: GHL_API_KEY?.length,
    locationId: GHL_LOCATION_ID
  });
  
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    console.error('Missing GHL credentials in environment variables');
    return res.status(500).json({ 
      success: false,
      error: 'Server configuration error - environment variables not set.' 
    });
  }
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    console.log('Creating contact:', { name, email });
    
    // Split name into first and last
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    const requestBody = {
      locationId: GHL_LOCATION_ID,
      firstName: firstName,
      lastName: lastName,
      email: email,
      source: 'HORSEARMY.COM Website',
      tags: ['website-signup', 'horsearmy-lead']
    };
    
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    
    // Call GoHighLevel API v2
    const apiUrl = 'https://services.leadconnectorhq.com/contacts/';
    console.log('Calling GHL v2 API:', apiUrl);
    
    const ghlResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify(requestBody)
    });
    
    const ghlData = await ghlResponse.json();
    
    console.log('GHL Response Status:', ghlResponse.status);
    console.log('GHL Response Headers:', Object.fromEntries(ghlResponse.headers.entries()));
    console.log('GHL Response Body:', JSON.stringify(ghlData, null, 2));
    
    if (ghlResponse.ok) {
      console.log('✅ Contact created successfully');
      return res.status(200).json({ 
        success: true, 
        message: 'Contact created successfully',
        contactId: ghlData.contact?.id || ghlData.id
      });
    } else {
      console.error('❌ GHL API Error:', {
        status: ghlResponse.status,
        statusText: ghlResponse.statusText,
        error: ghlData
      });
      return res.status(ghlResponse.status).json({ 
        success: false, 
        error: ghlData.message || ghlData.error || ghlData.msg || `GHL API returned ${ghlResponse.status}: ${ghlResponse.statusText}`
      });
    }
    
  } catch (error) {
    console.error('❌ Server error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error: ' + error.message 
    });
  }
}
