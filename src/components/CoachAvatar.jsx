import React from 'react';

/**
 * CoachAvatar Component
 * Displays the friendly coach's avatar and name.
 */
function CoachAvatar() {
  return (
    <div className="coach-header">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Clara - Money Compass Coach"
        className="coach-avatar"
      />
      <div className="coach-info">
        <h3>Hi, ich bin Clara dein Money Compass Coach</h3>
      </div>
    </div>
  );
}

export default CoachAvatar;
