import React from 'react';
import CoachAvatar from './CoachAvatar';

/**
 * RecommendationCard Component
 * Displays the coach avatar and the AI-generated recommendation or error.
 * 
 * @param {string} recommendation - The recommendation text to display
 * @param {string} error - The error text to display
 */
function RecommendationCard({ recommendation, error }) {
  const content = error || recommendation;

  return (
    <div className="card recommendation-card">
      <CoachAvatar />
      {content && (
        <div className={`recommendation-bubble ${error ? 'error-bubble' : ''}`}>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}

export default RecommendationCard;
