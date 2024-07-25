import React, { useState, useEffect } from 'react';

export const usePreventClick = (selector) => {
  const preventClick = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    document.querySelector(selector).addEventListener('click', preventClick);

    return () => {
      const item = document.querySelector(selector);
      if (item) {
        item.removeEventListener('click', preventClick);
      }
    };
  }, []);
  return null;
};
