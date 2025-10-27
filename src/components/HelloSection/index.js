import React, { Fragment } from 'react';
import { bool } from 'prop-types';

import Bride from '@assets/images/p-dinda-2.jpg';
import Groom from '@assets/images/p-indra.jpg';

import { styWrapper } from './styles';

function HelloSection({ isInvitation }) {
  const finalSubtitle = isInvitation ? '03 Tháng 10 2020, HARRIS Hotel Sentraland, Semarang' : 'Thứ Bảy, 03 Tháng 10 2020';

  return (
    <Fragment>
      <div id="fh5co-couple" css={styWrapper}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2 className="main-font">Assalamualaikum Wr. Wb</h2>
              <h3 className="sub-title hs">{finalSubtitle}</h3>
              <p className="info">
                Với lòng cầu nguyện Ân Phước và Sự Chấp Thuận của Allah, cùng ý định thực hành Sunnah của Rasulullah ﷺ để xây dựng
                gia đình Sakinah, Mawaddah wa Rahmah, chúng tôi kính mong các bạn cầu nguyện cho chúng tôi luôn được thuận lợi và
                hạnh phúc.
              </p>
            </div>
          </div>
          <div className="couple-wrap">
            <div className="couple-half">
              <div className="groom">
                <img src={Bride} alt="groom" className="img-responsive" loading="lazy" />
              </div>
              <div className="desc-groom">
                <h3 className="main-font">Dinda Saraswati, S.I.Kom.</h3>
                <p className="parent-name parent-name__top">
                  Putri Bapak Totok Somo Dipoyono <br />& Ibu Setyo Listiani
                </p>
              </div>
            </div>
            <p className="heart text-center">
              <i className="icon-heart2"></i>
            </p>
            <div className="and-love">
              <i>&</i>
            </div>
            <div className="couple-half">
              <div className="bride">
                <img src={Groom} alt="groom" className="img-responsive" loading="lazy" />
              </div>
              <div className="desc-bride">
                <h3 className="main-font">Indra Kusuma, S.Kom.</h3>
                <p className="parent-name">
                  Putra Bapak Bunari <br />& Ibu Suratun
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

HelloSection.propTypes = {
  isInvitation: bool.isRequired,
};

export default HelloSection;
