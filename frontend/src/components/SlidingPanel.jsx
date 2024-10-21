import React, { useEffect } from 'react';

const SlidingPanel = ({ isbell }) => {
  useEffect(() => {
    if (isbell) {
      // Disable scrolling on the page
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed'; // Prevents scroll jump
      document.body.style.width = '100%'; // Ensures the page width doesn't change
    } else {
      // Re-enable scrolling on the page
      document.body.style.overflow = 'auto';
      document.body.style.position = 'relative';
    }

    // Cleanup to ensure that the styles are reset when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'relative';
    };
  }, [isbell]);

  return (
    <div
      className={`fixed z-20 top-20 right-0 h-96 bg-white shadow-lg transition-transform duration-300 ${
        isbell ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ width: '300px' }}
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <p>You have no new notifications.</p>
      </div>
    </div>
  );
};

export default SlidingPanel;
