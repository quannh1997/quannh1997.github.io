import React, { useEffect, useState } from 'react';

function AdminPage() {
  const [activeTab, setActiveTab] = useState('registrations');
  const [registrations, setRegistrations] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [copied, setCopied] = useState(false);
  const [selectedWishes, setSelectedWishes] = useState([]);

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
        setSelectedWishes([]);
      }
    }
  };

  const handleSelectWish = (wishId) => {
    setSelectedWishes(prev => {
      if (prev.includes(wishId)) {
        return prev.filter(id => id !== wishId);
      }
      return [...prev, wishId];
    });
  };

  const handleSelectAllWishes = (e) => {
    if (e.target.checked) {
      setSelectedWishes(wishes.map(w => w.id));
    } else {
      setSelectedWishes([]);
    }
  };

  const handleDeleteSelectedWishes = () => {
    if (selectedWishes.length === 0) {
      alert('Vui lòng chọn ít nhất một lời chúc để xóa');
      return;
    }

    if (window.confirm(`Bạn chắc chắn muốn xóa ${selectedWishes.length} lời chúc đã chọn?`)) {
      const updatedWishes = wishes.filter(w => !selectedWishes.includes(w.id));
      setWishes(updatedWishes);
      localStorage.setItem('wishes', JSON.stringify(updatedWishes));
      setSelectedWishes([]);
      
      // Dispatch event để cập nhật wishes section
      window.dispatchEvent(new Event('storage'));
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
        {selectedWishes.length > 0 && (
          <p style={{ color: '#c8966b', fontWeight: 'bold' }}>
            ✓ Đã chọn: {selectedWishes.length} lời chúc
          </p>
        )}
      </div>

      {selectedWishes.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={handleDeleteSelectedWishes}
            style={{
              padding: '10px 20px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            🗑️ Xóa {selectedWishes.length} lời chúc đã chọn
          </button>
        </div>
      )}

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <thead>
          <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '12px', textAlign: 'center', width: '50px', borderRight: '1px solid #ddd' }}>
              <input 
                type="checkbox"
                checked={wishes.length > 0 && selectedWishes.length === wishes.length}
                onChange={handleSelectAllWishes}
                style={{ cursor: 'pointer', width: '16px', height: '16px' }}
              />
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd', width: '15%' }}>Tên</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd', width: '35%' }}>Lời chúc</th>
            <th style={{ padding: '12px', textAlign: 'center', borderRight: '1px solid #ddd', width: '150px' }}>Ảnh</th>
            <th style={{ padding: '12px', textAlign: 'left', width: '15%' }}>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {wishes.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                Không có lời chúc nào
              </td>
            </tr>
          ) : (
            wishes.map((wish, index) => (
              <tr 
                key={wish.id} 
                style={{ 
                  borderBottom: '1px solid #eee',
                  background: selectedWishes.includes(wish.id) 
                    ? '#fff3cd' 
                    : index % 2 === 0 ? '#ffffff' : '#f9f9f9'
                }}
              >
                <td style={{ padding: '12px', textAlign: 'center', borderRight: '1px solid #ddd' }}>
                  <input 
                    type="checkbox"
                    checked={selectedWishes.includes(wish.id)}
                    onChange={() => handleSelectWish(wish.id)}
                    style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                  />
                </td>
                <td style={{ padding: '12px', borderRight: '1px solid #ddd', fontWeight: 'bold', color: '#c8966b' }}>
                  {wish.name}
                </td>
                <td style={{ padding: '12px', borderRight: '1px solid #ddd', fontSize: '14px', lineHeight: '1.5' }}>
                  {wish.message.length > 150 
                    ? wish.message.substring(0, 150) + '...' 
                    : wish.message}
                </td>
                <td style={{ padding: '12px', textAlign: 'center', borderRight: '1px solid #ddd' }}>
                  {(wish.imageUrl || wish.image) ? (
                    <img 
                      src={wish.imageUrl || wish.image} 
                      alt="Wish" 
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                      onClick={() => window.open(wish.imageUrl || wish.image, '_blank')}
                    />
                  ) : (
                    <span style={{ color: '#999', fontSize: '12px' }}>Không có</span>
                  )}
                </td>
                <td style={{ padding: '12px', fontSize: '12px', color: '#666' }}>
                  {wish.date || new Date(wish.timestamp).toLocaleString('vi-VN')}
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
