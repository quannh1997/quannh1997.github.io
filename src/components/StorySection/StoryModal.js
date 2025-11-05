import React, { useState, useEffect } from 'react';
import { bool, func, object, number } from 'prop-types';
import { styModalWrapper } from './styles';

const CLOUDINARY_CLOUD_NAME = 'ddr3jvlpu'; 
const CLOUDINARY_UPLOAD_PRESET = 'wedding-wishes'; 

function StoryModal({ isOpen, onClose, editStory, editIndex }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    imageUrl: '',
  });
  const [isUploading, setIsUploading] = useState(false);

  // Load data when editing
  useEffect(() => {
    if (isOpen && editStory) {
      setFormData({
        title: editStory.title || '',
        date: editStory.date || '',
        description: editStory.description || '',
        imageUrl: editStory.image || '',
      });
    } else if (isOpen && !editStory) {
      // Reset form when adding new
      setFormData({
        title: '',
        date: '',
        description: '',
        imageUrl: '',
      });
    }
  }, [isOpen, editStory]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = () => {
    setIsUploading(true);

    // Khởi tạo Cloudinary Upload Widget
    if (window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: CLOUDINARY_CLOUD_NAME,
          uploadPreset: CLOUDINARY_UPLOAD_PRESET,
          sources: ['local', 'camera'],
          multiple: false,
          maxFileSize: 2000000, // 2MB
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
          cropping: true,
          croppingAspectRatio: 1.5,
          croppingShowDimensions: true,
          folder: 'wedding-stories',
          resourceType: 'image',
        },
        (error, result) => {
          setIsUploading(false);
          if (error) {
            console.error('Upload error:', error);
            alert('Lỗi upload ảnh. Vui lòng thử lại.');
            return;
          }

          if (result.event === 'success') {
            const imageUrl = result.info.secure_url;
            setFormData(prev => ({
              ...prev,
              imageUrl
            }));
          }
        }
      );
      widget.open();
    } else {
      setIsUploading(false);
      alert('Cloudinary chưa được tải. Vui lòng thử lại.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.date.trim() || !formData.description.trim()) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // Lấy danh sách stories hiện tại từ localStorage
    const existingStories = JSON.parse(localStorage.getItem('stories') || '[]');

    const storyData = {
      title: formData.title.trim(),
      date: formData.date.trim(),
      description: formData.description.trim(),
      image: formData.imageUrl || '',
    };

    let updatedStories;
    
    if (editStory && editIndex !== null && editIndex !== undefined) {
      // Edit mode - update existing story
      updatedStories = [...existingStories];
      updatedStories[editIndex] = storyData;
    } else {
      // Add mode - add new story
      updatedStories = [...existingStories, storyData];
    }

    // Lưu vào localStorage
    localStorage.setItem('stories', JSON.stringify(updatedStories));

    // Dispatch custom event để cập nhật StorySection
    window.dispatchEvent(new CustomEvent('storyUpdated'));

    // Reset form
    setFormData({
      title: '',
      date: '',
      description: '',
      imageUrl: '',
    });

    // Đóng modal
    onClose();

    alert(editStory ? 'Cập nhật câu chuyện thành công! ✨' : 'Thêm câu chuyện thành công! ✨');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div css={styModalWrapper} onClick={handleOverlayClick}>
      <div className="overlay" />
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            {editStory ? '✏️ Chỉnh sửa Câu Chuyện' : '📖 Thêm Câu Chuyện'}
          </h2>
        </div>
        
        <div className="modal-body">
          <form className="story-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Tiêu đề *</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                placeholder="VD: Jumpa Pertama"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Ngày tháng *</label>
              <input
                type="text"
                id="date"
                name="date"
                className="form-control"
                placeholder="VD: 10 Oktober 2015"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Nội dung câu chuyện *</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                placeholder="Kể câu chuyện của bạn..."
                rows="6"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Ảnh (Tùy chọn)</label>
              <div style={{ marginBottom: '10px' }}>
                <button
                  type="button"
                  onClick={handleImageUpload}
                  disabled={isUploading}
                  className="upload-button"
                >
                  {isUploading ? '⏳ Đang tải...' : '📷 Chọn ảnh'}
                </button>
              </div>
              {formData.imageUrl && (
                <div className="image-preview">
                  <img src={formData.imageUrl} alt="Preview" />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                    className="remove-image"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="button" onClick={onClose} className="btn-cancel">
                Hủy
              </button>
              <button type="submit" className="btn-submit">
                {editStory ? '💾 Lưu thay đổi' : '✨ Thêm câu chuyện'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

StoryModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  editStory: object,
  editIndex: number,
};

export default StoryModal;
