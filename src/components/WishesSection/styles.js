import { css, keyframes } from '@emotion/core';
import isMobileDevice from '../../helpers/isMobileDevice';
import BackgroundDesktop from '@assets/images/bg-wedding1.jpg';
import BackgroundMobile from '@assets/images/bg-wedding2.jpg';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Montserrat:wght@400;500;600;700&display=swap');
`;

export { globalStyles };

const animation = keyframes`
  0% { right: -300px; opacity: 0;}
  50% { right: 50px; opacity: 0.5;}
  100% {right: 0px; opacity: 1;};
`;

const animationLeft = keyframes`
  0% { left: -300px; opacity: 0;}
  50% { left: 50px; opacity: 0.5;}
  100% {left: 0px; opacity: 1;};
`;

export const styWishesSection = css`
  background-image: url(${isMobileDevice() ? BackgroundMobile : BackgroundDesktop});
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #fff !important;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 0;
  }

  .container {
    position: relative;
    z-index: 1;
  }

  .main-font {
    font-family: 'Dancing Script', 'Cookie', cursive;
    font-size: 4em;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
    
    @media screen and (max-width: 768px) {
      font-size: 2.5em;
    }
    
    @media screen and (max-width: 400px) {
      font-size: 2em;
    }
  }

  @media screen and (max-width: 768px) {
    min-height: auto;
    padding: 40px 0;
  }
`;

export const styWishesContainer = css`
  height: 580px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 30px;
  border-radius: 4px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    height: 480px;
    padding: 20px;
  }

  @media screen and (max-width: 400px) {
    height: 430px;
    padding: 15px;
  }
`;

export const styWithAnimation = (isActive) => css`
  position: relative;
  animation: ${isActive ? animation : animationLeft} 1s;
`;

export const styWrapperItem = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 480px;
  overflow-y: auto;
  padding: 20px 0;

  @media screen and (max-width: 768px) {
    min-height: 380px;
    max-height: 480px;
  }

  @media screen and (max-width: 400px) {
    min-height: 350px;
    max-height: 450px;
    padding: 15px 0;
  }

  figure {
    margin-bottom: 20px;

    img {
      max-height: 150px;
      width: 150px;
      object-fit: cover;

      @media screen and (max-width: 768px) {
        max-height: 120px;
        width: 120px;
      }
    }
  }

  h4 {
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    margin: 0 0 4px 0;
  }

  blockquote {
    margin-top: 16px !important;
    max-height: 230px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 20px;
    color: #fff;

    @media screen and (max-width: 768px) {
      max-height: 180px;
      max-width: 600px;
      padding: 0 15px;
    }

    @media screen and (max-width: 400px) {
      max-width: 100%;
      padding: 0 10px;
    }
  }

  .infoName {
    font-size: 12px;
    text-transform: capitalize;
    letter-spacing: 2px;
    display: block;
    color: #fff;
  }

  .hide {
    display: none;
  }

  .active {
    display: block;
  }

  .description {
    font-size: 16px !important;
    line-height: 1.6;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    text-align: center;
    max-width: 100%;
    color: #fff !important;
  }

  @media screen and (max-width: 400px) {
    .description {
      font-size: 14px !important;
    }
  }
`;

export const styButtonWrapper = css`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 10px;

  @media screen and (max-width: 768px) {
    bottom: 15px;
  }

  @media screen and (max-width: 400px) {
    bottom: 10px;
  }

  .button-nav {
    font-size: 14px;
    padding: 5px 20px;
    background: transparent;
    color: rgba(255, 255, 255, 0.6);
    border: 2px solid rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.3s ease;
    outline: none;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
      color: #fff;
      border-color: #fff;
    }
    
    &:active {
      background: transparent;
      color: #fff;
      border-color: #fff;
      transform: translateY(0);
    }
  }
`;

export const styAddWishButton = css`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  animation: pulse 2s ease infinite;

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .btn-add-wish {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f14e95;
    border: none;
    color: #fff;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Montserrat', sans-serif;
    
    &:hover {
      background: #d63d7f;
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
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
    max-width: 500px;
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

  .wishes-form {
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
        background: #fff;
        color: #333;
        font-size: 14px;
        transition: all 0.3s ease;
        font-family: 'Montserrat', sans-serif;
        box-sizing: border-box;
        
        &::placeholder {
          color: #999;
        }
        
        &:focus {
          outline: none;
          border-color: #c8966b;
          background: #fafafa;
        }
      }

      textarea.form-control {
        resize: vertical;
        min-height: 100px;
      }

      .help-text {
        display: block;
        margin-top: 5px;
        font-size: 12px;
        color: #999;
        font-family: 'Montserrat', sans-serif;
      }

      .btn-upload-image {
        width: 100%;
        padding: 12px 15px;
        border: 2px dashed #c8966b;
        border-radius: 6px;
        background: #fafafa;
        color: #c8966b;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Montserrat', sans-serif;
        
        &:hover {
          background: #f0f0f0;
          border-color: #b07a57;
          color: #b07a57;
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }

    .image-preview-wrapper {
      position: relative;
      
      .image-preview {
        width: 100%;
        max-height: 200px;
        object-fit: cover;
        border-radius: 6px;
        border: 2px solid #ddd;
      }

      .btn-remove-image {
        display: block;
        margin-top: 10px;
        background: #dc3545;
        border: none;
        color: #fff;
        padding: 8px 16px;
        font-size: 12px;
        border-radius: 4px;
        cursor: pointer;
        font-family: 'Montserrat', sans-serif;
        
        &:hover {
          background: #c82333;
        }
      }
    }

    .btn-submit,
    .btn {
      background: #c8966b;
      border: 2px solid #c8966b;
      color: #fff;
      padding: 12px 30px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Montserrat', sans-serif;
      width: 100%;
      margin-bottom: 10px;
      
      &:hover {
        background: #b07a57;
        border-color: #b07a57;
        transform: translateY(-2px);
      }
      
      &:active {
        transform: translateY(0);
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .btn-default {
      background: #ddd;
      border-color: #ddd;
      color: #333;
      
      &:hover {
        background: #bbb;
        border-color: #bbb;
      }
    }
  }
`;
