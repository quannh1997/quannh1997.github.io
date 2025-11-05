import React from 'react';
import { string, bool } from 'prop-types';
import { styWrapperItem, styWithAnimation } from './styles';
import defaultAvatar from '@assets/images//user.png';

function WishesItem({ image, name, infoName, description, isActive }) {
  if (!isActive) return null;

  const renderItem = () => {
    return (
      <div className="item" css={styWrapperItem}>
        <div className={`testimony-slide text-center ${isActive ? 'active' : 'hide'}`}>
          <figure>
            <img src={image || defaultAvatar} alt={name} loading="lazy" />
          </figure>
          <h4>{name}</h4>
          <span className="infoName">{infoName}</span>
          <blockquote>
            <p className="description">{description}</p>
          </blockquote>
        </div>
      </div>
    );
  };

  return <div css={styWithAnimation(isActive)}>{renderItem()}</div>;
}

WishesItem.propTypes = {
  image: string,
  name: string.isRequired,
  infoName: string.isRequired,
  description: string.isRequired,
  isActive: bool.isRequired,
};

export default React.memo(WishesItem);
