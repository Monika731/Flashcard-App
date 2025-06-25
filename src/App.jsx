import React, { useState } from 'react';
import './App.css';
import { flashcards } from './flashcards';
import FlashcardWithGuess from './components/FlashcardWithGuess';

function App() {
  const [availableCards, setAvailableCards] = useState([...flashcards]);
  const [masteredCards, setMasteredCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMastered, setIsMastered] = useState(false);

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const handleCorrect = () => {
    const newStreak = currentStreak + 1;
    setCurrentStreak(newStreak);
    if (newStreak > longestStreak) {
      setLongestStreak(newStreak);
    }
  };

  const handleIncorrect = () => {
    setCurrentStreak(0);
  };

  const handleNextCard = () => {
    if (currentIndex < availableCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsMastered(false);
    }
  };

  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsMastered(false);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
    setAvailableCards(shuffled);
    setCurrentIndex(0);
    setIsMastered(false);
  };

  const handleConfirmMastered = () => {
    const masteredCard = availableCards[currentIndex];
    const newAvailable = availableCards.filter((_, i) => i !== currentIndex);
    const newMastered = [...masteredCards, masteredCard];

    setAvailableCards(newAvailable);
    setMasteredCards(newMastered);
    setIsMastered(false);

    if (newAvailable.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= newAvailable.length) {
      setCurrentIndex(newAvailable.length - 1);
    }
  };

  const currentCard = availableCards[currentIndex];

  return (
    <div className="app-container">
      <header>
        <h1>Flashcard App</h1>
        <p>Study flags of countries and important JavaScript terms.</p>
        <p>Number of cards: {availableCards.length}</p>
        <p>
          Current Streak: {currentStreak}, Longest Streak: {longestStreak}
        </p>
      </header>

      {availableCards.length > 0 ? (
        <>
          <FlashcardWithGuess
            card={currentCard}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />

          <div className="nav-buttons">
            <button
              onClick={handlePrevCard}
              disabled={currentIndex === 0}
              className={currentIndex === 0 ? 'disabled' : ''}
            >
              ← Previous
            </button>

            <button onClick={handleShuffle}>Shuffle Cards</button>

            <button
              onClick={handleNextCard}
              disabled={currentIndex === availableCards.length - 1}
              className={currentIndex === availableCards.length - 1 ? 'disabled' : ''}
            >
              Next →
            </button>
          </div>

          <div className="mastered-section">
            <label>
              <input
                type="checkbox"
                checked={isMastered}
                onChange={(e) => setIsMastered(e.target.checked)}
              />
              I've mastered this card
            </label>
            <button
              onClick={handleConfirmMastered}
              disabled={!isMastered}
              className={!isMastered ? 'disabled' : ''}
            >
              Confirm Mastered
            </button>
          </div>
        </>
      ) : (
        <h2>🎉 You’ve mastered all the cards!</h2>
      )}
    </div>
  );
}

export default App;