import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import './FlashcardWithGuess.css';

const FlashcardWithGuess = ({ card, onCorrect, onIncorrect }) => {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null); // "correct" | "incorrect" | null

  // Reset feedback and input when card changes
  useEffect(() => {
    setGuess('');
    setFeedback(null);
  }, [card.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalize = (str) =>
      str.toLowerCase().replace(/[^\w\s]/gi, '').trim();

    const user = normalize(guess);
    const target = normalize(card.back);

    if (target.includes(user) || user.includes(target)) {
      setFeedback('correct');
      onCorrect(); // Notify App component
    } else {
      setFeedback('incorrect');
      onIncorrect(); // Notify App component
    }

    setGuess('');
  };

  return (
    <div className={`flashcard-with-guess ${feedback}`}>
      <Flashcard card={card} />

      <form className="guess-form" onSubmit={handleSubmit}>
        <label htmlFor="guess">Guess the answer here: </label>
        <input
          id="guess"
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Type your guess"
          required
        />
        <button type="submit">Submit Guess</button>
      </form>

      {feedback && (
        <div className={`feedback ${feedback}`}>
          {feedback === 'correct' ? '✅ Correct!' : '❌ Try again!'}
        </div>
      )}
    </div>
  );
};

export default FlashcardWithGuess;
