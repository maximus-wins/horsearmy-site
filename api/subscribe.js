// Vercel Serverless Function for GoHighLevel Integration
// This runs server-side to avoid CORS and keep credentials secure

export default async function handler(req, res) {
  // Get credentials from environment variables
  const GHL_API_KEY = process.env.GHL_API_KEY;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
  
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    console.error('Missing GHL credentials in environment variables');
    console.error('GHL_API_KEY present:', !!GHL_API_KEY);
    console.error('GHL_LOCATION_ID present:', !!GHL_LOCATION_ID);
    return res.status(500).json({ 
      success: false,
      error: 'Server configuration error - environment variables not set. Please contact the administrator.' 
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
    
    console.log('Creating contact in GHL:', { name, email });
    
    // Split name into first and last
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    // Call GoHighLevel API
    const ghlResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        firstName: firstName,
        lastName: lastName,
        email: email,
        source: 'HORSEARMY.COM Website',
        tags: ['Website Lead', 'Email Signup']
      })
    });
    
    const ghlData = await ghlResponse.json();
    
    console.log('GHL Response Status:', ghlResponse.status);
    console.log('GHL Response Data:', JSON.stringify(ghlData, null, 2));
    
    if (ghlResponse.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Contact created successfully',
        contactId: ghlData.contact?.id || ghlData.id
      });
    } else {
      console.error('GHL API Error - Status:', ghlResponse.status);
      console.error('GHL API Error - Data:', ghlData);
      return res.status(ghlResponse.status).json({ 
        success: false, 
        error: ghlData.message || ghlData.error || ghlData.msg || 'Failed to create contact in GHL'
      });
    }
    
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error: ' + error.message 
    });
  }
}
