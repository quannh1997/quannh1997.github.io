import { css } from '@emotion/core';
import isMobileDevice from '../../helpers/isMobileDevice';
import BackgroundDesktop from'@assets/images/bg-wedding1.jpg';
import BackgroundMobile from'@assets/images/bg-wedding2.jpg';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Montserrat:wght@400;500;600;700&display=swap');
`;

export { globalStyles };

export const styWrapper = css`
  background-image: url(${isMobileDevice() ? BackgroundMobile : BackgroundDesktop});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff !important;
  position: relative;
  overflow: hidden;

  .container {
    width: 100%;
    max-height: 100vh;
    padding-top: 0;
    padding-bottom: 0;
  }

  .fh5co-heading {
    margin-bottom: 30px;
  }

  .main-font__wedding {
    font-family: 'Dancing Script', 'Cookie', cursive;
    font-size: 4em;
    font-weight: 700;
    
    @media screen and (max-width: 768px) {
      font-size: 2.5em;
    }
  }

  .bismillah {
    color: #fff !important;
    font-size: 16px !important;
    font-family: sans-serif;
  }

  .sub-title {
    color: #fff !important;
    font-size: 16px;
    font-family: 'Work Sans', Arial, sans-serif;
    font-weight: 400 !important;

    @media screen and (max-width: 400px) {
      font-size: 15px !important;
    }
  }

  .text__live {
    text-align: center;
    margin-top: 20px;
  }

  .main-font {
    font-family: 'Dancing Script', cursive, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 700;
    font-size: 3em;
  }

  @media screen and (max-width: 768px) {
    height: 100vh;
    overflow-y: auto;
    padding: 30px 0;
    
    .container {
      max-height: none;
    }
    
    .fh5co-heading {
      margin-bottom: 20px;
    }
  }

  @media screen and (max-width: 400px) {
    .main-font {
      line-height: 1;
      margin-bottom: 8px;
    }
  }
`;

export const styButtonWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: pulse 2s ease infinite;
  margin-top: -8px;
  border: none;

  .img__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 500px;
    border-radius: 24px;
    background: #f14e95;
    padding: 8px 16px;
  }

  i {
    margin-right: 4px;
  }

  img {
    max-width: 28px;
    margin-right: 8px;
    margin-bottom: 0;
  }
`;
