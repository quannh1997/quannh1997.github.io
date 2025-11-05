import React, { useState, useEffect, useCallback } from 'react';

import WishesItem from './WishesItem';
import { wishlist as defaultWishlist } from './wishlist-data';
import { styButtonWrapper, styWishesContainer } from './styles';

const INTERVAL_SLIDE = 10000;

function WishesContainer() {
  const [active, setActive] = useState(0);
  const [pauseSlide, setPauseSlide] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Load wishes from localStorage
  useEffect(() => {
    const loadWishes = () => {
      try {
        const storedWishes = localStorage.getItem('wishes');
        if (storedWishes) {
          const parsedWishes = JSON.parse(storedWishes);
          if (Array.isArray(parsedWishes) && parsedWishes.length > 0) {
            // Transform localStorage data to match WishesItem format
            const formattedWishes = parsedWishes.map(wish => ({
              name: wish.name,
              infoName: wish.date || new Date(wish.timestamp).toLocaleDateString('vi-VN'),
              description: wish.message,
              image: wish.imageUrl || wish.image || null
            }));
            
            // Combine with default wishlist (optional - show both)
            setWishlist([...formattedWishes, ...defaultWishlist]);
            return;
          }
        }
        
        // Fallback to default wishlist if no data in localStorage
        setWishlist(defaultWishlist);
      } catch (error) {
        console.error('Error loading wishes from localStorage:', error);
        setWishlist(defaultWishlist);
      }
    };

    loadWishes();

    // Listen for storage changes (when new wish is added)
    const handleStorageChange = (e) => {
      if (e.key === 'wishes') {
        loadWishes();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event listener for same-tab updates
    const handleWishAdded = () => {
      loadWishes();
    };
    window.addEventListener('wishAdded', handleWishAdded);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishAdded', handleWishAdded);
    };
  }, []);

  const totalWishes = wishlist.length || 0;

  const handleSetActive = (isNext = true) => {
    if (isNext) {
      if (active === totalWishes - 1) {
        setActive(0);
      } else {
        setActive(active + 1);
      }
    } else {
      if (active === 0) {
        setActive(totalWishes - 1);
      } else {
        setActive(active - 1);
      }
    }

    setPauseSlide(true);

    setTimeout(() => {
      setPauseSlide(false);
    }, INTERVAL_SLIDE);
  };

  const handleSetNext = useCallback(() => {
    if (active === wishlist.length - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  }, [active]);

  const renderWishlist = () => {
    return wishlist.map((w, index) => <WishesItem key={index} {...w} isActive={index === active} />);
  };

  /** Side effect to autoscroll */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pauseSlide) {
        handleSetNext();
      } else {
        clearInterval(interval);
      }
    }, INTERVAL_SLIDE);

    return () => clearInterval(interval);
  }, [handleSetNext, pauseSlide]);

  return (
    <div className="wrap-testimony" css={styWishesContainer}>
      {renderWishlist()}
      <div css={styButtonWrapper}>
        <button className="btn btn-sm button-nav" onClick={() => handleSetActive(false)}>{`< Prev`}</button>
        <button className="btn btn-sm button-nav" onClick={() => handleSetActive(true)}>{`Next >`}</button>
      </div>
    </div>
  );
}

export default React.memo(WishesContainer);
