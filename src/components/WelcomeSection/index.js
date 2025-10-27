/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Fragment, useState } from 'react';
import { object, string, bool, func } from 'prop-types';
import { Link } from 'gatsby';

import WeddingImg from '@assets/images/wedding-logo.png';
import CountContainer from './CountContainer';
import ScrollToDown from './ScrollToDown';
import { globalStyles, styWrapper, styHero, styBackground, styButtonWrapper } from './styles';

const DELAY_TIME = 1500;

function WelcomeSection({ location, guestName, isInvitation, isAnonymGuest, codeLink, onClickDetail }) {
  const [loading, setLoading] = useState(false);
  const [alreadyDownloadData, setAlreadyDownloadData] = useState(false);

  const handleScrollTo = () => {
    /** scroll into detail view */
    const element = document.getElementById('fh5co-couple');
    if (element && typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    } else {
      // fallback: do nothing but avoid throwing
      // console warn for debugging in dev
      // eslint-disable-next-line no-console
      console.warn('Element #fh5co-couple not found. Scroll skipped.');
    }
  };

  const handleShowDetail = () => {
    if (loading) return undefined;

    try {
      const myAudio = document.getElementById('myAudio');
      if (myAudio && typeof myAudio.play === 'function') {
        const playPromise = myAudio.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch((err) => {
            // autoplay might be blocked by browser; log but continue
            // eslint-disable-next-line no-console
            console.warn('Audio playback failed', err);
          });
        }
      }
    } catch {
      // eslint-disable-next-line no-console
      console.error('FAILED_TO_PLAY_MUSIC');
    }

    onClickDetail();

    if (!alreadyDownloadData) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setAlreadyDownloadData(true);
        handleScrollTo();
      }, DELAY_TIME);
    } else {
      handleScrollTo();
    }
  };

  const renderGuestSection = () => {
    // if (isAnonymGuest) return <h2 className="to-dearest-name">Dear Friends,</h2>;

    // return (
    //   <Fragment>
    //     <h3 className="to-dearest">Trân trọng kính mời</h3>
    //     <h2 className="to-dearest-name">{guestName}</h2>
    //   </Fragment>
    // );
  };

  return (
    <div css={[globalStyles, styHero]}>
      <header
        id="fh5co-header"
        role="banner"
        className="fh5co-cover"
        css={styBackground}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row" css={styWrapper}>
            <div className="col-md-8 col-md-offset-2 text-center">
              <img src={WeddingImg} alt="wedding-dinda-indra" />
              <h4 className="sub-title">The Wedding of</h4>
              <h1 className="title">Hồng Quân &amp; Tạ Quyên</h1>
              <div style={{ paddingTop: '30px' }}>
                <CountContainer />
              </div>
              {renderGuestSection()}
                        {/* {isInvitation && (
                          <div className="row" css={styButtonWrapper}>
                            <div className="col-md-3">
                              <Link to={`/e-ticket${codeLink ? `?${codeLink}` : ''}`}>
                                <button className="btn btn-default btn-block">Xem e-Ticket</button>
                              </Link>
                            </div>
                          </div>
                        )} */}
            </div>
          </div>
          <div className="row">
            <ScrollToDown loading={loading} onClick={handleShowDetail} />
          </div>
        </div>
      </header>
    </div>
  );
}

WelcomeSection.propTypes = {
  guestName: string.isRequired,
  isInvitation: bool.isRequired,
  isAnonymGuest: bool.isRequired,
  location: object.isRequired,
  codeLink: string,
  onClickDetail: func.isRequired,
};

WelcomeSection.defaultProps = {
  codeLink: '',
};

export default WelcomeSection;
