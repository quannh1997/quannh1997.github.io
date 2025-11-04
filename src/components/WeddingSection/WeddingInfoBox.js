import React from 'react';
import { string } from 'prop-types';
import isMobileDevice from '@helpers/isMobileDevice';

function WeddingInfoBox({ title, date, time, description }) {
  const isMobile = isMobileDevice();
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    }}>
      <div 
        className="event-wrap" 
        style={{ 
          minHeight: isMobile ? '170px' : '200px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          padding: isMobile ? '15px' : '20px',
          width: isMobile ? '320px' : '100%',
          maxWidth: '100%'
        }}
      >
        <h3 style={{ 
          fontSize: '18px', 
          paddingBottom: isMobile ? '10px' : '15px',
          marginTop: 0
        }}>{title}</h3>
        <div>
          <div className="event-col" style={{ 
            marginBottom: '8px',
            fontSize: '14px'
          }}>
            <i className="icon-clock"></i>
            <span>{time}</span>
          </div>
          <div className="event-col" style={{ 
            marginBottom: '8px',
            fontSize: '14px'
          }}>
            <i className="icon-calendar"></i>
            <span>{date}</span>
          </div>
          {description && (
            <div className="event-col" style={{ 
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              <i className="icon-location-pin"></i>
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          )}
        </div>
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
