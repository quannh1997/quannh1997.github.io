import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { photos } from './photo-data';
import { globalStyles, styWrapper } from './styles';

function PhotoSection() {
  const renderYoutubeVideo = () => {
    return (
      // <iframe
      //   title="Pre-Wedding Dinda & Indra"
      //   width="80%"
      //   height="360px"
      //   src="https://www.youtube.com/watch?v=OApCDEBqGNg"
      //   frameBorder="0"
      //   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      //   allowFullScreen
      // ></iframe>
      <div></div>
    );
  };

  return (
    <div id="fh5co-testimonial" className="fh5co-section-gray" css={[globalStyles, styWrapper]}>
      <div className="container">
        <div className="row">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2 className="main-font__photo">Album ảnh cưới</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-md-offset-1">{renderYoutubeVideo()}</div>
          </div>
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <ImageGallery items={photos} showBullets={false} />;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoSection;
