import React, { Fragment } from 'react';
import { bool } from 'prop-types';
import isMobileDevice from '@helpers/isMobileDevice';

import WeddingInfoBox from './WeddingInfoBox';
import MapButton from './MapButton';
import ButtonLive from './ButtonLive';
import { globalStyles, styWrapper } from './styles';
import {
  GROOM_LOCATION_NAME,
  GROOM_LOCATION_ADDRESS,
  GROOM_MAPS_LINK,
  BRIDE_LOCATION_NAME,
  BRIDE_LOCATION_ADDRESS,
  BRIDE_MAPS_LINK,
} from '@/constants';

function WeddingSection({ isInvitation }) {
  const isMobile = isMobileDevice();
  return (
    <Fragment>
      <div id="fh5co-event" css={[styWrapper, globalStyles]}>
        <div className="overlay" />
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2 className="main-font__wedding">Thời gian địa điểm rõ ràng ♪♪</h2>
            </div>
          </div>
          {!isMobile && (
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              </div>
            </div>
          )} 
          {!isMobile && (
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              </div>
            </div>
          )}  

          {/* 2 WeddingInfoBox ngang nhau */}
          <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="row">
                  <div className="col-md-5 col-sm-6 col-xs-12 text-center" style={{ order: 1 }}>
                    <WeddingInfoBox
                      title="Nhà Trai"
                      time="08:00 - 12:00"
                      date="Thứ Bảy, 27 Tháng 12 Năm 2025"
                      description={`<strong>${GROOM_LOCATION_NAME}</strong><br/>${GROOM_LOCATION_ADDRESS}`}
                    />
                  </div>
                  <div className="col-md-2 hidden-xs hidden-sm"></div>
                  <div className="col-md-5 col-sm-6 col-xs-12 text-center hidden-xs" style={{ order: 3 }}>
                    <WeddingInfoBox
                      title="Nhà Gái"
                      time="14:00 - 18:00"
                      date="Thứ Bảy, 27 Tháng 12 Năm 2025"
                      description={`<strong>${BRIDE_LOCATION_NAME}</strong><br/>${BRIDE_LOCATION_ADDRESS}`}
                    />
                  </div>
                  <div className="col-md-5 col-sm-6 col-xs-12 text-center hidden-sm hidden-md hidden-lg" style={{ order: 2, marginBottom: '20px' }}>
                    <MapButton mapLink={GROOM_MAPS_LINK} label="Xem trên bản đồ" />
                  </div>
                  <div className="col-md-5 col-sm-6 col-xs-12 text-center hidden-sm hidden-md hidden-lg" style={{ order: 3 }}>
                    <WeddingInfoBox
                      title="Nhà Gái"
                      time="14:00 - 18:00"
                      date="Thứ Bảy, 27 Tháng 12 Năm 2025"
                      description={`<strong>${BRIDE_LOCATION_NAME}</strong><br/>${BRIDE_LOCATION_ADDRESS}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2 Map buttons ngang nhau */}
            <div className="row hidden-xs">
              <div className="col-md-8 col-md-offset-2">
                <div className="row">
                  <div className="col-md-5 col-sm-6 text-center">
                    <MapButton mapLink={GROOM_MAPS_LINK} label="Xem trên bản đồ" />
                  </div>
                  <div className="col-md-2 hidden-xs hidden-sm"></div>
                  <div className="col-md-5 col-sm-6 text-center">
                    <MapButton mapLink={BRIDE_MAPS_LINK} label="Xem trên bản đồ" />
                  </div>
                </div>
              </div>
            </div>

            {/* Button cho mobile (sau WeddingInfoBox nhà gái) */}
            <div className="row hidden-sm hidden-md hidden-lg">
              <div className="col-md-8 col-md-offset-2">
                <div className="row">
                  <div className="col-xs-12 text-center">
                    <MapButton mapLink={BRIDE_MAPS_LINK} label="Xem trên bản đồ" />
                  </div>
              </div>
            </div>
          </div>
          {!isMobile && (
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              </div>
            </div>
          )} 
          {!isMobile && (
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              </div>
            </div>
          )}  
          {!isMobile && (
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              </div>
            </div>
          )}  
          {!isMobile && (
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              </div>
            </div>
          )}  
          <ButtonLive />
        </div>
      </div>
    </Fragment>
  );
}WeddingSection.propTypes = {
  isInvitation: bool.isRequired,
};

export default React.memo(WeddingSection);
