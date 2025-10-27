import React, { Fragment } from 'react';
import { bool } from 'prop-types';

import WeddingInfoBox from './WeddingInfoBox';
import ButtonLive from './ButtonLive';
import { styWrapper } from './styles';

function WeddingSection({ isInvitation }) {
  const renderGuestInfo = () => {
    return (
      <Fragment>
        <div className="col-md-8 col-md-offset-4">
          <WeddingInfoBox title="Lễ Cưới" time="08.00 WIB (Trực tiếp trên Instagram)" date="Thứ Bảy, 03 Tháng 10 2020" />
        </div>
        <ButtonLive />
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div id="fh5co-event" css={styWrapper}>
        <div className="overlay" />
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <span className="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
              <h2 className="main-font main-font__wedding">Lễ Cưới và Tiệc Mừng</h2>
              <span className="sub-title sub-title__wedding">Insha Allah sẽ được tổ chức vào:</span>
            </div>
          </div>
          <div className="row">
            {!isInvitation && renderGuestInfo()}
            {isInvitation && (
              <div className="col-md-10 col-md-offset-1">
                <WeddingInfoBox
                  title="Lễ Cưới"
                  time="Sẽ được tổ chức vào buổi sáng "
                  date="Thứ Bảy, 03 Tháng 10 2020"
                  description="Orange Ballroom <br/>HARRIS Hotel Sentraland, Semarang"
                />
                <WeddingInfoBox
                  title="Tiệc Mừng"
                  time="Theo lịch trình trong e-ticket "
                  date="Thứ Bảy, 03 Tháng 10 2020"
                  description="Orange Ballroom <br/>HARRIS Hotel Sentraland, Semarang"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

WeddingSection.propTypes = {
  isInvitation: bool.isRequired,
};

export default React.memo(WeddingSection);
