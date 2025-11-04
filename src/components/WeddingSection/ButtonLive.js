import React from 'react';
import { func } from 'prop-types';

import { styButtonWrapper } from './styles';

function ButtonLive({ onClickRegist }) {
  const handleClick = () => {
    if (onClickRegist) {
      onClickRegist();
    }
    // Scroll tới RegistSection sau khi render
    setTimeout(() => {
      const element = document.getElementById('fh5co-regist');
      if (element && typeof element.scrollIntoView === 'function') {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    }, 100);
  };

  return (
    <div className="row">
      <div className="col-md-12 text-center">
        <p className="text__live"></p>
        <button onClick={handleClick} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <div css={styButtonWrapper}>
            <div className="img__wrapper">
              <span>Đăng ký tham dự</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

ButtonLive.propTypes = {
  onClickRegist: func
};

export default React.memo(ButtonLive);
