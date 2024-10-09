import React, { useState, useEffect } from 'react';

export const usePreventClick = (selector) => {
  const preventClick = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const el = document.querySelector(selector);
    if (el) {
      el.addEventListener('click', preventClick);
    }
    return () => {
      if (el) {
        el.removeEventListener('click', preventClick);
      }
    };
  }, []);
  return null;
};
