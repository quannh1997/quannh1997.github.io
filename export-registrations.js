#!/usr/bin/env node

/**
 * Script để export dữ liệu đăng ký từ localStorage (lấy từ console) vào file JSON
 * 
 * Cách sử dụng:
 * 1. Mở DevTools console
 * 2. Chạy: localStorage.getItem('registrations')
 * 3. Copy kết quả
 * 4. Tạo file temp.json và paste dữ liệu
 * 5. Chạy: node export-registrations.js
 */

const fs = require('fs');
const path = require('path');

const registPath = path.join(__dirname, 'regist-data.json');

try {
  // Kiểm tra file temp.json (dữ liệu từ localStorage)
  const tempPath = path.join(__dirname, 'temp.json');
  
  if (fs.existsSync(tempPath)) {
    const tempData = fs.readFileSync(tempPath, 'utf8');
    const data = JSON.parse(tempData);
    
    // Đọc dữ liệu cũ nếu có
    let existing = [];
    if (fs.existsSync(registPath)) {
      const oldData = fs.readFileSync(registPath, 'utf8');
      existing = JSON.parse(oldData || '[]');
    }
    
    // Merge dữ liệu
    const merged = [...existing, ...data];
    
    // Ghi vào file
    fs.writeFileSync(registPath, JSON.stringify(merged, null, 2), 'utf8');
    
    console.log(`✅ Đã export ${data.length} record vào ${registPath}`);
    console.log(`📊 Tổng cộng: ${merged.length} record`);
    
    // Xóa file temp
    fs.unlinkSync(tempPath);
    console.log('🗑️ Xóa file temp.json');
  } else {
    console.log('❌ Không tìm thấy temp.json');
    console.log('Hướng dẫn:');
    console.log('1. Mở DevTools Console');
    console.log('2. Chạy: copy(JSON.stringify(JSON.parse(localStorage.getItem("registrations"))))');
    console.log('3. Tạo file temp.json và paste dữ liệu');
    console.log('4. Chạy: node export-registrations.js');
  }
} catch (error) {
  console.error('❌ Lỗi:', error.message);
}
