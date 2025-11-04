import React, { Fragment, useState } from 'react';
import { globalStyles, styWrapper } from './styles';
import isMobileDevice from '@helpers/isMobileDevice';

function RegistSection() {
  const isMobile = isMobileDevice();
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
      // Đọc dữ liệu cũ từ localStorage trước
      let registrations = [];
      const localStorageData = localStorage.getItem('registrations');
      if (localStorageData) {
        try {
          registrations = JSON.parse(localStorageData);
          if (!Array.isArray(registrations)) {
            registrations = [];
          }
        } catch (parseError) {
          console.warn('Lỗi parse localStorage:', parseError);
          registrations = [];
        }
      }

      // Thêm dữ liệu mới
      const newRegistration = {
        id: Date.now(),
        name: formData.name.trim(),
        event: formData.event,
        eventName: formData.event === 'bride' ? 'Nhà Gái' : 'Nhà Trai',
        quantity: parseInt(formData.quantity),
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleString('vi-VN')
      };

      registrations.push(newRegistration);

      // Lưu vào localStorage (append, không replace)
      localStorage.setItem('registrations', JSON.stringify(registrations));
      
      alert(`Cảm ơn ${formData.name} đã đăng ký tham dự!`);
      
      // Reset form
      setFormData({
        event: 'bride',
        name: '',
        quantity: 1
      });
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

  return (
    <Fragment>
      <div id="fh5co-regist" css={[styWrapper, globalStyles]}>
        <div className="overlay" />
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading" style={{ marginBottom: '60px' }}>
              <h2 className="main-font__regist">Đăng ký tham dự</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-md-offset-3" style={{ marginTop: '40px' }}>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default React.memo(RegistSection);
