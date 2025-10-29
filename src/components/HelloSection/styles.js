import { css } from '@emotion/core';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Montserrat:wght@400;500;600;700&display=swap');
`;

export { globalStyles };

export const styWrapper = css`
  .main-font {
    font-family: 'Dancing Script', 'Cookie', cursive;
    font-size: 3.5em;
    font-weight: 700;

    @media screen and (max-width: 768px) {
      font-size: 2.5em;
    }
  }

  .main-title {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 700;
    font-size: 1.8em;
  }

  .sub-title {
    color: #828282;
    font-weight: 600;
    letter-spacing: 1px;
    line-height: 20px;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  p {
    font-size: 16px;
    margin-top: 16px;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  @media screen and (max-width: 500px) {
    .main-title {
      font-size: 1.5em;
    }

    .title {
      font-size: 40px;
    }

    .sub-title {
      font-size: 18px;
      margin: 0 0 8px 0;
    }

    p {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 400px) {
    p {
      font-size: 14px;
    }
  }
`;
