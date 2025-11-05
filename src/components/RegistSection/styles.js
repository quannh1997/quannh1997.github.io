import { css } from '@emotion/core';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Montserrat:wght@400;500;600;700&display=swap');
`;

export { globalStyles };

export const styWrapper = css`
  background: linear-gradient(135deg, rgba(200, 150, 100, 0.8), rgba(150, 100, 80, 0.8));
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff !important;
  position: relative;
  padding: 40px 20px;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }

  .container {
    width: 100%;
    position: relative;
    z-index: 2;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    
    @media screen and (max-width: 768px) {
      padding: 25px;
      max-width: 90%;
    }
  }

  .fh5co-heading {
    margin-bottom: 30px;
    
    @media screen and (max-width: 768px) {
      margin-bottom: 20px;
    }
  }

  .main-font__regist {
    font-family: 'Dancing Script', 'Cookie', cursive;
    font-size: 2.5em;
    font-weight: 700;
    margin-bottom: 0;
    color: #333;
    
    @media screen and (max-width: 768px) {
      font-size: 1.8em;
    }
  }

  .regist-form {
    background: transparent;
    backdrop-filter: none;
    padding: 0;
    border-radius: 0;
    border: none;
  }

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
      
      &::placeholder {
        color: #999;
      }
      
      &:focus {
        outline: none;
        border-color: #c8966b;
        background: #fafafa;
      }
      
      option {
        background: #fff;
        color: #333;
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

  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`;
