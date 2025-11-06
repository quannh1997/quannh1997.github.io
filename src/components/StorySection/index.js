import React, { Fragment, useState, useEffect } from 'react';

import StoryItem from './StoryItem';
import { getStories } from '../../helpers/firebase';
import { globalStyles, styWrapper } from './styles';
import getQueryValue from '@helpers/getQueryValue';

function StorySection() {
  const [stories, setStories] = useState([]);
  const [showingStory, setShowingStory] = useState(false);

  useEffect(() => {
    // Kiểm tra URL query parameter
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const showStory = urlParams.get('showStory');
      setShowingStory(showStory === 'true' || showStory === '1');
    }

    // Lấy dữ liệu stories từ Firebase
    const loadStories = async () => {
      try {
        const firebaseStories = await getStories();
        if (firebaseStories && firebaseStories.length > 0) {
          setStories(firebaseStories);
        } else {
          setStories([]);
        }
      } catch (error) {
        console.error('Lỗi load dữ liệu stories từ Firebase:', error);
        setStories([]);
      }
    };

    loadStories();

    // Lắng nghe sự kiện storyUpdated để cập nhật real-time
    const handleStoryUpdated = () => {
      loadStories();
    };

    window.addEventListener('storyUpdated', handleStoryUpdated);

    return () => {
      window.removeEventListener('storyUpdated', handleStoryUpdated);
    };
  }, []);

  const renderStories = () => {
    return stories.map((s, index) => <StoryItem key={index} {...s} isInverted={index % 2 === 1} />);
  };

  // Nếu showingStory = false, không render gì cả
  if (!showingStory) {
    return null;
  }

  return (
    <Fragment>
      <div id="fh5co-couple-story" css={[styWrapper, globalStyles]}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
              <h2 className="main-font__story">Cưới thôi, hẹn hò vậy đủ lâu rồi</h2>
              <p className="sub-title"></p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-md-offset-0">
              <ul className="timeline animate-box">{renderStories()}</ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default StorySection;
