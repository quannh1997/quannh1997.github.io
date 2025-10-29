import { css } from '@emotion/core';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Montserrat:wght@400;500;600;700&display=swap');
`;

export { globalStyles };

export const styWrapper = css`
  .main-font {
    font-family: 'Dancing Script', 'Cookie', cursive;
    font-weight: 400;

    @media screen and (max-width: 768px) {
      font-size: 3em;
    }

    @media screen and (max-width: 400px) {
      font-size: 2.5em;
    }
  }

  .sub-title {
    color: #828282;
    font-weight: 400;
    line-height: 1.6;
    font-size: 16px;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media screen and (max-width: 768px) {
      font-size: 15px;
    }
  }
`;
