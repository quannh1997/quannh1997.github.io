import React, { useState, Fragment } from 'react';
import { bool } from 'prop-types';
import WishesContainer from './WishesContainer';
import WishesModal from './WishesModal';
import { styAddWishButton, styWishesSection, globalStyles } from './styles';

function WishesSection({ isInvitation }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      <div id="fh5co-testimonial" css={[styWishesSection, globalStyles]}>
        <div className="container">
          <div className="row">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
                <h2 className="main-font"></h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <WishesContainer />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div css={styAddWishButton}>
                  <button className="btn-add-wish" onClick={handleOpenModal}>
                    ✍️ Gửi lời chúc
                  </button>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="row" style={{ marginTop: '60px' }}>
              <div className="col-md-12 text-center">
                <div style={{ 
                  borderTop: '1px solid rgba(255, 255, 255, 0.3)', 
                  paddingTop: '30px',
                  color: '#fff'
                }}>
                  <p>
                    <small style={{ display: 'block', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>
                      &copy; 2025 Quân & Quyên Wedding
                    </small>
                    <small style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)' }}>
                      Made by QuanNH |{' '}
                      <a 
                        href="https://www.facebook.com/mon.nguyen.12720/" 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ color: '#f14e95', textDecoration: 'none' }}
                      >
                        Facebook link
                      </a>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WishesModal isOpen={showModal} onClose={handleCloseModal} />
      </div>
    </Fragment>
  );
}

WishesSection.propTypes = {
  isInvitation: bool.isRequired,
};

export default WishesSection;
