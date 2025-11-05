import React, { Fragment, useState, useEffect } from 'react';
import { bool, func } from 'prop-types';
import { styModalWrapper } from './styles';

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = 'ddr3jvlpu'; 
const CLOUDINARY_UPLOAD_PRESET = 'wedding-wishes'; 

function WishesModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    imageUrl: null,
    imagePreview: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Load Cloudinary widget script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.cloudinary) {
      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Đọc dữ liệu cũ từ localStorage
      let wishes = [];
      const localStorageData = localStorage.getItem('wishes');
      if (localStorageData) {
        try {
          wishes = JSON.parse(localStorageData);
          if (!Array.isArray(wishes)) {
            wishes = [];
          }
        } catch (parseError) {
          console.warn('Lỗi parse localStorage:', parseError);
          wishes = [];
        }
      }

      // Tạo lời chúc mới
      const newWish = {
        id: Date.now(),
        name: formData.name.trim(),
        message: formData.message.trim(),
        imageUrl: formData.imageUrl || null, // Lưu URL thay vì Base64
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleString('vi-VN')
      };

      wishes.push(newWish);

      // Lưu vào localStorage
      localStorage.setItem('wishes', JSON.stringify(wishes));
      
      // Gọi API để lưu vào file
      try {
        const response = await fetch('/api/save-wishes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(wishes)
        });
        
        if (!response.ok) {
          console.warn('⚠️ Không thể lưu vào file, nhưng đã lưu vào localStorage');
        } else {
          const result = await response.json();
          console.log('✅ Đã lưu vào file:', result);
        }
      } catch (apiError) {
        console.warn('⚠️ API error:', apiError.message);
        // Vẫn tiếp tục vì đã lưu vào localStorage
      }
      
      // Dispatch custom event to notify WishesContainer
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('wishAdded'));
      }
      
      alert(`Cảm ơn ${formData.name} đã gửi lời chúc!`);
      
      // Reset form
      setFormData({
        name: '',
        message: '',
        imageUrl: null,
        imagePreview: null
      });
      
      // Đóng modal
      onClose();
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

  const handleUploadImage = () => {
    if (typeof window === 'undefined' || !window.cloudinary) {
      alert('Cloudinary widget chưa được tải. Vui lòng thử lại!');
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'camera'],
        multiple: false,
        maxFileSize: 2000000, // 2MB
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        maxImageWidth: 1200,
        maxImageHeight: 1200,
        cropping: true,
        croppingAspectRatio: 1,
        showSkipCropButton: false,
        folder: 'wedding-wishes',
        tags: ['wedding', 'wishes'],
        context: { alt: 'Wedding wish image' },
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#c8966b',
            tabIcon: '#c8966b',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#c8966b',
            action: '#c8966b',
            inactiveTabIcon: '#999999',
            error: '#F44235',
            inProgress: '#c8966b',
            complete: '#20B832',
            sourceBg: '#E4EBF1'
          },
          fonts: {
            default: null,
            "'Montserrat', sans-serif": {
              url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap',
              active: true
            }
          }
        }
      },
      (error, result) => {
        if (error) {
          console.error('Upload error:', error);
          alert('Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại!');
          setUploading(false);
          return;
        }

        if (result.event === 'success') {
          console.log('Upload successful:', result.info);
          setFormData(prev => ({
            ...prev,
            imageUrl: result.info.secure_url,
            imagePreview: result.info.secure_url
          }));
          setUploading(false);
          widget.close();
        }

        if (result.event === 'upload-added') {
          setUploading(true);
        }
      }
    );

    widget.open();
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      imageUrl: null,
      imagePreview: null
    }));
  };

  if (!isOpen) return null;

  return (
    <Fragment>
      <div css={styModalWrapper}>
        <div className="overlay" onClick={onClose} style={{ cursor: 'pointer' }} />
        <div className="modal-container">
          <div className="modal-header">
            <h2 className="modal-title">Gửi lời chúc</h2>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit} className="wishes-form">
              <div className="form-group">
                <label htmlFor="name">Tên của bạn *</label>
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
                <label htmlFor="message">Lời chúc *</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  placeholder="Nhập lời chúc của bạn"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Ảnh (Tùy chọn)</label>
                {!formData.imagePreview ? (
                  <button
                    type="button"
                    className="btn-upload-image"
                    onClick={handleUploadImage}
                    disabled={uploading}
                  >
                    {uploading ? '📤 Đang upload...' : '📷 Chọn ảnh'}
                  </button>
                ) : (
                  <div className="image-preview-wrapper">
                    <img src={formData.imagePreview} alt="Preview" className="image-preview" />
                    <button type="button" className="btn-remove-image" onClick={handleRemoveImage}>
                      ✕ Xóa ảnh
                    </button>
                  </div>
                )}
                <small className="help-text">Kích thước tối đa: 2MB. Ảnh sẽ được tự động optimize.</small>
              </div>

              <div className="form-group text-center">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-submit"
                  disabled={submitting}
                >
                  {submitting ? 'Đang xử lý...' : 'Gửi lời chúc'}
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
    </Fragment>
  );
}

WishesModal.propTypes = {
  isOpen: bool,
  onClose: func.isRequired
};

export default React.memo(WishesModal);
