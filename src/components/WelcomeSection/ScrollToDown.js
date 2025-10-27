import React from 'react';

import { styScrollWrapper } from './styles';
import { bool, func } from 'prop-types';

function ClickToSeeDetail({ loading, onClick }) {
  return (
    <div css={styScrollWrapper}>
      <section id="scroll" className="scroll__icon">
        <button
          type="button"
          className="button"
          aria-label={loading ? 'Đang chuẩn bị' : 'Còn nữa ở dưới :)'}
          onClick={onClick}
        >
          <span />
        </button>
        <span className="text">{loading ? 'Đang chuẩn bị' : 'Còn nữa ở dưới :)'}</span>
      </section>
    </div>
  );
}

ClickToSeeDetail.propTypes = {
  loading: bool.isRequired,
  onClick: func.isRequired,
};

export default ClickToSeeDetail;
