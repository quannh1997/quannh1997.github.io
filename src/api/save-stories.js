const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  // Chỉ chấp nhận POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const storiesData = req.body;

    // Đường dẫn đến file stories.json
    const filePath = path.join(process.cwd(), 'api', 'stories.json');

    // Ghi dữ liệu vào file
    fs.writeFileSync(filePath, JSON.stringify(storiesData, null, 2), 'utf-8');

    return res.status(200).json({ 
      success: true, 
      message: 'Stories data saved successfully',
      count: storiesData.length 
    });
  } catch (error) {
    console.error('Error saving stories:', error);
    return res.status(500).json({ 
      error: 'Failed to save stories data',
      details: error.message 
    });
  }
}
