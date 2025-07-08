import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashcards from '../../hooks/useFlashcards';
import './FlashcardReviewPage.css';

const FlashcardReviewPage = () => {
  const { decks } = useFlashcards();
  const navigate = useNavigate();
  
  const [selectedDeckId, setSelectedDeckId] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);

  const selectedDeck = decks.find(deck => deck.id === selectedDeckId);

  useEffect(() => {
    if (selectedDeck) {
      setShuffledCards([...selectedDeck.cards].sort(() => Math.random() - 0.5));
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  }, [selectedDeckId]);

  const handleDeckSelect = (deckId) => {
    setSelectedDeckId(deckId);
  };

  const handleNextCard = () => {
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setIsFlipped(!isFlipped);
    } else if (e.key === 'ArrowRight') {
      handleNextCard();
    } else if (e.key === 'ArrowLeft') {
      handlePreviousCard();
    }
  };

  if (decks.length === 0) {
    return (
      <div className="flashcard-review empty-state">
        <h2>No Flashcard Decks Available</h2>
        <p>Create a deck to start reviewing</p>
        <button
          onClick={() => navigate('/flashcard-management')}
          className="create-deck-btn"
        >
          Create Deck
        </button>
      </div>
    );
  }

  if (!selectedDeck) {
    return (
      <div className="flashcard-review">
        <h2>Select a Deck to Review</h2>
        <div className="deck-selection">
          {decks.map(deck => (
            <button
              key={deck.id}
              onClick={() => handleDeckSelect(deck.id)}
              className="deck-select-btn"
            >
              <h3>{deck.name}</h3>
              <span>{deck.cards.length} cards</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentCard = shuffledCards[currentCardIndex];

  return (
    <div
      className="flashcard-review"
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <div className="review-header">
        <h2>{selectedDeck.name}</h2>
        <div className="progress-info">
          <span>Card {currentCardIndex + 1} of {shuffledCards.length}</span>
          <button
            onClick={() => setSelectedDeckId(null)}
            className="change-deck-btn"
          >
            Change Deck
          </button>
        </div>
      </div>

      <div className="review-container">
        <button
          onClick={handlePreviousCard}
          disabled={currentCardIndex === 0}
          className="nav-btn prev-btn"
        >
          ←
        </button>

        <div
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <p>{currentCard.front}</p>
            </div>
            <div className="flashcard-back">
              <p>{currentCard.back}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleNextCard}
          disabled={currentCardIndex === shuffledCards.length - 1}
          className="nav-btn next-btn"
        >
          →
        </button>
      </div>

      <div className="review-controls">
        <p className="keyboard-hint">
          Press <kbd>Space</kbd> to flip, <kbd>←</kbd> <kbd>→</kbd> to navigate
        </p>
      </div>
    </div>
  );
};

export default FlashcardReviewPage; 