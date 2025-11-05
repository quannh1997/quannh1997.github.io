import { css } from '@emotion/core';

export const styWrapper = (noImage) => css`
  ${noImage && `margin-left: 100px;`}

  @media screen and (max-width: 991px) {
    ${noImage && `margin-left: 100px;`}
  }
`;

export const styModalWrapper = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: -1;
  }

  .modal-container {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    z-index: 1;
    
    @media screen and (max-width: 768px) {
      max-width: 90%;
    }
  }

  .modal-header {
    padding: 30px 30px 20px;
    border-bottom: 1px solid #eee;
    
    @media screen and (max-width: 768px) {
      padding: 20px 20px 15px;
    }
  }

  .modal-title {
    font-family: 'Dancing Script', 'Cookie', cursive;
    font-size: 2em;
    font-weight: 700;
    margin: 0;
    color: #333;
    text-align: center;
    
    @media screen and (max-width: 768px) {
      font-size: 1.6em;
    }
  }

  .modal-body {
    padding: 30px;
    
    @media screen and (max-width: 768px) {
      padding: 20px;
    }
  }

  .story-form {
    .form-group {
      margin-bottom: 20px;
      
      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 14px;
        color: #333;
        font-family: 'Montserrat', sans-serif;
      }
      
      .form-control {
        width: 100%;
        padding: 12px 15px;
        border: 2px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        font-family: 'Montserrat', sans-serif;
        transition: border-color 0.3s ease;
        box-sizing: border-box;
        
        &:focus {
          outline: none;
          border-color: #c8966b;
        }
        
        &::placeholder {
          color: #999;
        }
      }
      
      textarea.form-control {
        resize: vertical;
        min-height: 120px;
        line-height: 1.5;
      }
    }

    .upload-button {
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      font-family: 'Montserrat', sans-serif;
      transition: background 0.3s ease;
      
      &:hover {
        background: #0056b3;
      }
      
      &:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    }

    .image-preview {
      position: relative;
      margin-top: 15px;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid #ddd;
      
      img {
        width: 100%;
        height: auto;
        max-height: 300px;
        object-fit: cover;
        display: block;
      }
      
      .remove-image {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(220, 53, 69, 0.9);
        color: white;
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
        
        &:hover {
          background: rgba(220, 53, 69, 1);
        }
      }
    }

    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      
      button {
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        font-family: 'Montserrat', sans-serif;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
      }
      
      .btn-cancel {
        background: #f8f9fa;
        color: #666;
        
        &:hover {
          background: #e9ecef;
        }
      }
      
      .btn-submit {
        background: #c8966b;
        color: white;
        
        &:hover {
          background: #b37d52;
        }
      }
    }
  }
`;
