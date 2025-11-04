import React, { useEffect, useState } from 'react';

function AdminPage() {
  const [registrations, setRegistrations] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const data = localStorage.getItem('registrations');
    if (data) {
      try {
        setRegistrations(JSON.parse(data));
      } catch (error) {
        console.error('Lỗi parse dữ liệu:', error);
      }
    }
  }, []);

  const handleCopyToClipboard = () => {
    const jsonString = JSON.stringify(registrations, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadJSON = () => {
    const jsonString = JSON.stringify(registrations, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonString));
    element.setAttribute('download', `registrations-${new Date().toISOString().split('T')[0]}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClearData = () => {
    if (window.confirm('Bạn chắc chắn muốn xóa tất cả dữ liệu?')) {
      localStorage.removeItem('registrations');
      setRegistrations([]);
    }
  };

  const brideCount = registrations.filter(r => r.event === 'bride').reduce((sum, r) => sum + r.quantity, 0);
  const groomCount = registrations.filter(r => r.event === 'groom').reduce((sum, r) => sum + r.quantity, 0);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>📊 Admin - Quản lý Đăng ký</h1>
      
      <div style={{ 
        background: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px'
      }}>
        <h2>📈 Thống kê</h2>
        <p><strong>Tổng đăng ký:</strong> {registrations.length}</p>
        <p><strong>Nhà Gái:</strong> {brideCount} người</p>
        <p><strong>Nhà Trai:</strong> {groomCount} người</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleCopyToClipboard} style={{
          padding: '10px 20px',
          marginRight: '10px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          {copied ? '✅ Đã copy' : '📋 Copy JSON'}
        </button>
        
        <button onClick={handleDownloadJSON} style={{
          padding: '10px 20px',
          marginRight: '10px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          💾 Tải xuống JSON
        </button>

        <button onClick={handleClearData} style={{
          padding: '10px 20px',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          🗑️ Xóa tất cả
        </button>
      </div>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <thead>
          <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Tên</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Sự kiện</th>
            <th style={{ padding: '12px', textAlign: 'center', borderRight: '1px solid #ddd' }}>Số lượng</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Thời gian đăng ký</th>
          </tr>
        </thead>
        <tbody>
          {registrations.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            registrations.map((reg, index) => (
              <tr key={reg.id} style={{ 
                borderBottom: '1px solid #eee',
                background: index % 2 === 0 ? '#ffffff' : '#f9f9f9'
              }}>
                <td style={{ padding: '12px', borderRight: '1px solid #ddd' }}>{reg.name}</td>
                <td style={{ padding: '12px', borderRight: '1px solid #ddd' }}>
                  <span style={{
                    background: reg.event === 'bride' ? '#ffb6c1' : '#87ceeb',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {reg.eventName}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center', borderRight: '1px solid #ddd' }}>
                  {reg.quantity}
                </td>
                <td style={{ padding: '12px', fontSize: '12px', color: '#666' }}>
                  {reg.date}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '40px', padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
        <h3>📝 JSON Data</h3>
        <pre style={{
          background: '#333',
          color: '#0f0',
          padding: '15px',
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '300px',
          fontSize: '12px'
        }}>
          {JSON.stringify(registrations, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default AdminPage;
