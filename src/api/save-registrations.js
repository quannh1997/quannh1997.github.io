const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  // Chỉ chấp nhận POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const registrationsData = req.body;

    // Đường dẫn đến file regist-data.json
    const filePath = path.join(process.cwd(), 'api', 'regist-data.json');

    // Ghi dữ liệu vào file
    fs.writeFileSync(filePath, JSON.stringify(registrationsData, null, 2), 'utf-8');

    return res.status(200).json({ 
      success: true, 
      message: 'Registrations data saved successfully',
      count: registrationsData.length 
    });
  } catch (error) {
    console.error('Error saving registrations:', error);
    return res.status(500).json({ 
      error: 'Failed to save registrations data',
      details: error.message 
    });
  }
}
