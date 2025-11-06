import React, { Fragment, useState } from 'react';
import { globalStyles, styWrapper } from './styles';
import { saveRegistration } from '../../helpers/firebase';

function RegistModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    event: 'bride', // 'bride' hoặc 'groom'
    name: '',
    quantity: 1
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Tạo dữ liệu registration mới
      const newRegistration = {
        name: formData.name.trim(),
        event: formData.event,
        eventName: formData.event === 'bride' ? 'Nhà Gái' : 'Nhà Trai',
        quantity: parseInt(formData.quantity),
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleString('vi-VN')
      };

      // Lưu vào Firebase
      const result = await saveRegistration(newRegistration);
      
      if (result.success) {
        alert(`Cảm ơn ${formData.name} đã đăng ký tham dự!`);
        
        // Reset form
        setFormData({
          event: 'bride',
          name: '',
          quantity: 1
        });
        
        // Đóng modal
        onClose();
      } else {
        throw new Error(result.error || 'Không thể lưu đăng ký');
      }
    } catch (error) {
      console.error('❌ Lỗi submit form:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <Fragment>
      <div css={[styWrapper, globalStyles]} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="overlay" onClick={onClose} style={{ cursor: 'pointer' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1000, maxWidth: '500px', margin: '0 auto' }}>
          <div className="row">
            <div className="col-md-12 text-center fh5co-heading" style={{ marginBottom: '30px' }}>
              <h2 className="main-font__regist">Đăng ký tham dự</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <form onSubmit={handleSubmit} className="regist-form">
                <div className="form-group">
                  <label htmlFor="event">Tham gia</label>
                  <select
                    id="event"
                    name="event"
                    className="form-control"
                    value={formData.event}
                    onChange={handleChange}
                    required
                  >
                    <option value="bride">Nhà Gái</option>
                    <option value="groom">Nhà Trai</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="name">Tên</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Nhập tên của bạn"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Số lượng</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="form-control"
                    min="1"
                    max="10"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group text-center">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Đang xử lý...' : 'Xác nhận tham dự'}
                  </button>
                </div>

                <div className="form-group text-center">
                  <button 
                    type="button" 
                    className="btn btn-default"
                    onClick={onClose}
                  >
                    Đóng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default React.memo(RegistModal);
