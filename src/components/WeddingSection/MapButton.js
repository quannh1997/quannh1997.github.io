import React from 'react';
import { string } from 'prop-types';

function MapButton({ mapLink, label }) {
  return (
    <a
      href={mapLink}
      target="_blank"
      rel="noreferrer"
      className="btn btn-default btn-block"
      style={{
        background: 'transparent',
        color: '#fff',
        border: '2px solid rgba(255, 255, 255, 0.5)',
        padding: '10px 20px',
        borderRadius: '4px',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '15px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        marginTop: '15px',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <i className="icon-location-pin" style={{ marginRight: '8px' }}></i>
      {label}
    </a>
  );
}

MapButton.propTypes = {
  mapLink: string.isRequired,
  label: string.isRequired,
};

export default React.memo(MapButton);
