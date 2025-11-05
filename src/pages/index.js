import React, { useState, Fragment } from 'react';
import { object } from 'prop-types';
import getQueryValue from '@helpers/getQueryValue';
/**
 * List of local components
 */
import MainLayout from '@components/Layout';
import WelcomeSection from '@components/WelcomeSection';
import WeddingSection from '@components/WeddingSection';
import RegistModal from '@components/RegistSection';
import StorySection from '@components/StorySection';
import PhotoSection from '@components/PhotoSection/Loadable';
import WishesSection from '@components/WishesSection';
import FloatingMusic from '@components/FloatingMusic/Loadable';

function Home({ location }) {
  const guestName = decodeURIComponent(getQueryValue(location, 'to') || '');
  const isInvitation = true;
  const firstName = guestName.replace(/ .*/, '');
  const isAnonymGuest = guestName === '' && !isInvitation;

  const [showDetailContent, setShowDetailContent] = useState(false);
  const [showRegistModal, setShowRegistModal] = useState(false);

  const handleClickDetail = () => {
    setShowDetailContent(true);
  };

  const handleClickRegist = () => {
    setShowRegistModal(true);
  };

  const handleCloseModal = () => {
    setShowRegistModal(false);
  };

  const renderDetailContent = () => {
    if (!showDetailContent) return null;

    return (
      <Fragment>
        <WeddingSection isInvitation={isInvitation} onClickRegist={handleClickRegist} />
        <StorySection />
        <PhotoSection />
        <WishesSection isInvitation={isInvitation} />
      </Fragment>
    );
  };

  return (
    <MainLayout>
      <WelcomeSection
        guestName={guestName}
        isAnonymGuest={isAnonymGuest}
        isInvitation={isInvitation}
        location={location}
        onClickDetail={handleClickDetail}
      />
      {renderDetailContent()}
      <RegistModal isOpen={showRegistModal} onClose={handleCloseModal} />
      <FloatingMusic />
    </MainLayout>
  );
}

Home.propTypes = {
  location: object.isRequired,
};

export default Home;
