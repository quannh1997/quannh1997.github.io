import { css } from '@emotion/core';
import isMobileDevice from '../../helpers/isMobileDevice';
import BackgroundDesktop from '@assets/images/bg-wedding1.jpg';
import BackgroundMobile from '@assets/images/bg-regist2.jpg';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Montserrat:wght@400;500;600;700&display=swap');
`;

export { globalStyles };

export const styWrapper = css`
  background-image: url(${isMobileDevice() ? BackgroundMobile : BackgroundDesktop});
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff !important;
  position: relative;
  padding: 40px 0;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  .container {
    width: 100%;
    position: relative;
    z-index: 2;
  }

  .fh5co-heading {
    margin-bottom: 40px;
    
    @media screen and (max-width: 768px) {
      margin-bottom: 30px;
    }
  }

  .main-font__regist {
    font-family: 'Dancing Script', 'Cookie', cursive;
    font-size: 3em;
    font-weight: 700;
    margin-bottom: 0;
    color: #fff;
    
    @media screen and (max-width: 768px) {
      font-size: 2em;
    }
  }

  .regist-form {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 40px;
    border-radius: 8px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    
    @media screen and (max-width: 768px) {
      padding: 25px;
    }
  }

  .form-group {
    margin-bottom: 25px;
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 16px;
      color: #fff;
      font-family: 'Montserrat', sans-serif;
    }
    
    .form-control {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 15px;
      transition: all 0.3s ease;
      font-family: 'Montserrat', sans-serif;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
      
      &:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.8);
        background: rgba(255, 255, 255, 0.25);
      }
      
      option {
        background: #333;
        color: #fff;
      }
    }
  }

  .btn-submit {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.5);
    color: #fff;
    padding: 12px 40px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Montserrat', sans-serif;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.8);
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 768px) {
    padding: 30px 0;
  }
`;
