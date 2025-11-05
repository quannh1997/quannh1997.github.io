import React, { Fragment, useState, useEffect } from 'react';

import StoryItem from './StoryItem';
import { stories as defaultStories } from './stories-data';

function StorySection() {
  const [stories, setStories] = useState(defaultStories);

  useEffect(() => {
    // Lấy dữ liệu stories từ localStorage
    const storiesData = localStorage.getItem('stories');
    if (storiesData) {
      try {
        const parsedStories = JSON.parse(storiesData);
        if (parsedStories.length > 0) {
          setStories(parsedStories);
        }
      } catch (error) {
        console.error('Lỗi parse dữ liệu stories:', error);
      }
    }

    // Lắng nghe sự kiện storage để cập nhật real-time
    const handleStorageChange = () => {
      const updatedData = localStorage.getItem('stories');
      if (updatedData) {
        try {
          const parsedStories = JSON.parse(updatedData);
          setStories(parsedStories.length > 0 ? parsedStories : defaultStories);
        } catch (error) {
          console.error('Lỗi parse dữ liệu stories:', error);
        }
      } else {
        setStories(defaultStories);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storyUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storyUpdated', handleStorageChange);
    };
  }, []);

  const renderStories = () => {
    return stories.map((s, index) => <StoryItem key={index} {...s} isInverted={index % 2 === 1} />);
  };

  return (
    <Fragment>
      <div id="fh5co-couple-story">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
              <h2 className="main-font">Jalan Berdua</h2>
              <p className="sub-title">Kisah kasih sejak awal kami berjumpa</p>
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
