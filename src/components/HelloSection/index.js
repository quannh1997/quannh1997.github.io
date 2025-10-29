import React, { Fragment } from 'react';
import { bool } from 'prop-types';

import quan from '@assets/images/p-quan.jpg';
import quyen from '@assets/images/p-quyen.jpg';

import { styWrapper, globalStyles } from './styles';

function HelloSection({ isInvitation }) {
  const finalSubtitle = 'Thứ Bảy, 27 Tháng 12 Năm 2025';

  return (
    <Fragment>
      <div id="fh5co-couple" css={[globalStyles, styWrapper]}>
        <div className="container"> 
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2 className="main-font">Join us!</h2>
              <h3 className="sub-title hs">{finalSubtitle}</h3>
              <p className="p">
                Sau 6 năm bên nhau, chúng mình đã quyết định về chung một nhà.
              </p>
            </div>
          </div>
          <div className="couple-wrap">
            <div className="couple-half">
              <div className="groom">
                <img src={quan} alt="groom" className="img-responsive" loading="lazy" />
              </div>
              <div className="desc-groom">
                <h3 className="main-font">Nguyễn Hồng Quân</h3>
                <p className="parent-name parent-name__top">
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
                <img src={quyen} alt="groom" className="img-responsive" loading="lazy" />
              </div>
              <div className="desc-bride">
                <h3 className="main-font">Tạ Thị Quyên</h3>
                <p className="parent-name">
                  <br /> <br /><br />
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
