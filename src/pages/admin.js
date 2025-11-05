import React, { useEffect, useState } from 'react';

function AdminPage() {
  const [activeTab, setActiveTab] = useState('registrations');
  const [registrations, setRegistrations] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Lấy dữ liệu registrations từ localStorage
    const regData = localStorage.getItem('registrations');
    if (regData) {
      try {
        setRegistrations(JSON.parse(regData));
      } catch (error) {
        console.error('Lỗi parse dữ liệu registrations:', error);
      }
    }

    // Lấy dữ liệu wishes từ localStorage
    const wishData = localStorage.getItem('wishes');
    if (wishData) {
      try {
        setWishes(JSON.parse(wishData));
      } catch (error) {
        console.error('Lỗi parse dữ liệu wishes:', error);
      }
    }
  }, []);

  const handleCopyToClipboard = () => {
    const data = activeTab === 'registrations' ? registrations : wishes;
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadJSON = () => {
    const data = activeTab === 'registrations' ? registrations : wishes;
    const jsonString = JSON.stringify(data, null, 2);
    const element = document.createElement('a');
    const filename = `${activeTab}-${new Date().toISOString().split('T')[0]}.json`;
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonString));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClearData = () => {
    const confirmMsg = activeTab === 'registrations' 
      ? 'Bạn chắc chắn muốn xóa tất cả dữ liệu đăng ký?'
      : 'Bạn chắc chắn muốn xóa tất cả lời chúc?';
    
    if (window.confirm(confirmMsg)) {
      if (activeTab === 'registrations') {
        localStorage.removeItem('registrations');
        setRegistrations([]);
      } else {
        localStorage.removeItem('wishes');
        setWishes([]);
      }
    }
  };

  const brideCount = registrations.filter(r => r.event === 'bride').reduce((sum, r) => sum + r.quantity, 0);
  const groomCount = registrations.filter(r => r.event === 'groom').reduce((sum, r) => sum + r.quantity, 0);

  const renderRegistrations = () => (
    <>
      <div style={{ 
        background: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px'
      }}>
        <h2>📈 Thống kê Đăng ký</h2>
        <p><strong>Tổng đăng ký:</strong> {registrations.length}</p>
        <p><strong>Nhà Gái:</strong> {brideCount} người</p>
        <p><strong>Nhà Trai:</strong> {groomCount} người</p>
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
    </>
  );

  const renderWishes = () => (
    <>
      <div style={{ 
        background: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px'
      }}>
        <h2>📈 Thống kê Lời chúc</h2>
        <p><strong>Tổng lời chúc:</strong> {wishes.length}</p>
        <p><strong>Có ảnh:</strong> {wishes.filter(w => w.imageUrl || w.image).length}</p>
        <p><strong>Không có ảnh:</strong> {wishes.filter(w => !w.imageUrl && !w.image).length}</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {wishes.length === 0 ? (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            color: '#999',
            background: 'white',
            borderRadius: '8px',
            gridColumn: '1 / -1'
          }}>
            Không có lời chúc nào
          </div>
        ) : (
          wishes.map((wish, index) => (
            <div key={wish.id} style={{
              background: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                paddingBottom: '10px',
                borderBottom: '1px solid #eee'
              }}>
                <strong style={{ color: '#c8966b', fontSize: '16px' }}>{wish.name}</strong>
                <span style={{ fontSize: '11px', color: '#999' }}>
                  {new Date(wish.timestamp).toLocaleDateString('vi-VN')}
                </span>
              </div>
              
              {(wish.imageUrl || wish.image) && (
                <div style={{ marginBottom: '15px' }}>
                  <img 
                    src={wish.imageUrl || wish.image} 
                    alt="Wish" 
                    style={{
                      width: '100%',
                      maxHeight: '200px',
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />
                </div>
              )}
              
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#333',
                marginBottom: '10px',
                flex: 1
              }}>
                {wish.message}
              </p>
              
              <div style={{
                fontSize: '11px',
                color: '#999',
                marginTop: 'auto',
                paddingTop: '10px',
                borderTop: '1px solid #eee'
              }}>
                {wish.date}
              </div>
            </div>
          ))
        )}
      </div>

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
          {JSON.stringify(wishes, null, 2)}
        </pre>
      </div>
    </>
  );

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>📊 Admin - Quản lý Dữ liệu</h1>
      
      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px',
        borderBottom: '2px solid #ddd'
      }}>
        <button
          onClick={() => setActiveTab('registrations')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'registrations' ? '#c8966b' : 'transparent',
            color: activeTab === 'registrations' ? 'white' : '#666',
            border: 'none',
            borderBottom: activeTab === 'registrations' ? '3px solid #c8966b' : '3px solid transparent',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: activeTab === 'registrations' ? 'bold' : 'normal',
            transition: 'all 0.3s ease'
          }}
        >
          📋 Đăng ký ({registrations.length})
        </button>
        
        <button
          onClick={() => setActiveTab('wishes')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'wishes' ? '#c8966b' : 'transparent',
            color: activeTab === 'wishes' ? 'white' : '#666',
            border: 'none',
            borderBottom: activeTab === 'wishes' ? '3px solid #c8966b' : '3px solid transparent',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: activeTab === 'wishes' ? 'bold' : 'normal',
            transition: 'all 0.3s ease'
          }}
        >
          💌 Lời chúc ({wishes.length})
        </button>
      </div>

      {/* Action Buttons */}
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
          {copied ? '✅ Đã copy' : '� Copy JSON'}
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

      {/* Content based on active tab */}
      {activeTab === 'registrations' ? renderRegistrations() : renderWishes()}
    </div>
  );
}

export default AdminPage;
