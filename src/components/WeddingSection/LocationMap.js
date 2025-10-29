import React from 'react';
import { string } from 'prop-types';

function LocationMap({ mapUrl, title }) {
  return (
    <div className="col-md-6 col-sm-6 text-center">
      <div className="event-wrap" style={{ padding: '0' }}>
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: '0', minHeight: '350px' }}
          frameBorder="0"
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
          title={title}
        ></iframe>
      </div>
    </div>
  );
}

LocationMap.propTypes = {
  mapUrl: string.isRequired,
  title: string.isRequired,
};

export default React.memo(LocationMap);
