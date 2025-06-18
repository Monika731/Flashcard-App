import React, { useState, useEffect } from 'react';
import './Flashcard.css';

const Flashcard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // 🛠 Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [card.id]);

  return (
    <div className={`flashcard-wrapper ${card.category.toLowerCase()}`} onClick={handleFlip}>
      <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">
          {card.isImage ? (
            <img src={card.front} alt="Flashcard front" />
          ) : (
            <p>{card.front}</p>
          )}
        </div>
        <div className="flashcard-back">
          <p>{card.back}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
