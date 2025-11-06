import { css } from '@emotion/core';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Montserrat:wght@400;500;600;700&display=swap');
`;

export { globalStyles };

export const styWrapper = css`
  background-color: #f5f5f5;
  width: 100%;
  min-height: auto;
  padding: 40px 0;
  // color: #333;

  .main-font__photo {
    font-family: 'Dancing Script', 'Cookie', cursive;
    font-size: 3em;
    font-weight: 700;
    margin-bottom: 0;
    // color: #333;
    
    @media screen and (max-width: 768px) {
      font-size: 2em;
    }
  }
`;
