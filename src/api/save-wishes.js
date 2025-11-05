const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  // Chỉ chấp nhận POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const wishesData = req.body;

    // Đường dẫn đến file wishes-data.json
    const filePath = path.join(process.cwd(), 'api', 'wishes-data.json');

    // Ghi dữ liệu vào file
    fs.writeFileSync(filePath, JSON.stringify(wishesData, null, 2), 'utf-8');

    return res.status(200).json({ 
      success: true, 
      message: 'Wishes data saved successfully',
      count: wishesData.length 
    });
  } catch (error) {
    console.error('Error saving wishes:', error);
    return res.status(500).json({ 
      error: 'Failed to save wishes data',
      details: error.message 
    });
  }
}
