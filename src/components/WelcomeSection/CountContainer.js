import React from 'react';
import useDateCountdown from '@/hooks/useDateCountdown';
import CountItem from './CountItem';
import { styMargin } from './styles';
import isMobileDevice from '@helpers/isMobileDevice';

function CountContainer() {
  const { days, hours, minutes, seconds, timeHasRunOut, isEventOver } = useDateCountdown();
  const isMobile = isMobileDevice();

  return (
    <div className="row">
      <div className="col-md-12" style={{ fontSize: isMobile ? '16px' : '20px' }}>
          {`COMING SOON...`}
        </div>
      <div className="col-md-12" css={styMargin('0 0 16px 0')}>
        <CountItem text="Ngày" number={days} />
        <CountItem text="Giờ" number={hours} />
        <CountItem text="Phút" number={minutes} />
        <CountItem text="Giây" number={seconds} />
      </div>
    </div>
  );
}

export default CountContainer;
