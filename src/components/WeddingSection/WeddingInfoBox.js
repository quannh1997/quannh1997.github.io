import React from 'react';
import { string } from 'prop-types';

function WeddingInfoBox({ title, date, time, description }) {
  return (
    <div className="event-wrap" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
      <h3 style={{ fontSize: '18px', paddingBottom: '15px' }}>{title}</h3>
      <div>
        <div className="event-col" style={{ marginBottom: '8px' }}>
          <i className="icon-clock"></i>
          <span>{time}</span>
        </div>
        <div className="event-col" style={{ marginBottom: '8px' }}>
          <i className="icon-calendar"></i>
          <span>{date}</span>
        </div>
        {description && (
          <div className="event-col" style={{ marginBottom: '8px' }}>
            <i className="icon-location-pin"></i>
            <span dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}
      </div>
    </div>
  );
}

WeddingInfoBox.propTypes = {
  title: string.isRequired,
  date: string.isRequired,
  time: string.isRequired,
  description: string.isRequired,
};

export default React.memo(WeddingInfoBox);
