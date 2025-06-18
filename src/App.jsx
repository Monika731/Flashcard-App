import React, { useState } from 'react';
import './App.css';
import { flashcards } from './flashcards';
import Flashcard from './components/Flashcard';

function App() {
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * flashcards.length)
  );

  const handleNextCard = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * flashcards.length);
    } while (newIndex === currentIndex);
    setCurrentIndex(newIndex);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="app-container">
      <header>
        <h1>Flashcard App</h1>
        <p>Study flags of countries and important JavaScript terms.</p>
        <p>Total Cards: {flashcards.length}</p>
      </header>

      <Flashcard key={currentCard.id} card={currentCard} />

      <button className="next-button" onClick={handleNextCard}>
        Next Card
      </button>
    </div>
  );
}

export default App;
