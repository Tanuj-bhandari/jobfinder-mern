// Arrow.js
import React from 'react';

export const PrevArrow = ({ onClick }) => (
  <button
    className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg'
    onClick={onClick}
  >
    &lt;
  </button>
);

export const NextArrow = ({ onClick }) => (
  <button
    className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg'
    onClick={onClick}
  >
    &gt;
  </button>
);
