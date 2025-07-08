import React, { useState } from 'react';
import useFlashcards from '../../hooks/useFlashcards';
import './FlashcardManagementPage.css';

const FlashcardManagementPage = () => {
  const {
    decks,
    selectedDeck,
    setSelectedDeck,
    createDeck,
    updateDeck,
    deleteDeck,
    addCard,
    updateCard,
    deleteCard
  } = useFlashcards();

  const [newDeckName, setNewDeckName] = useState('');
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');
  const [editingCard, setEditingCard] = useState(null);

  const handleCreateDeck = (e) => {
    e.preventDefault();
    if (!newDeckName.trim()) return;

    const deck = createDeck(newDeckName);
    setNewDeckName('');
    setSelectedDeck(deck);
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCardFront.trim() || !newCardBack.trim() || !selectedDeck) return;

    addCard(selectedDeck.id, {
      front: newCardFront,
      back: newCardBack
    });

    setNewCardFront('');
    setNewCardBack('');
  };

  const handleUpdateCard = (e) => {
    e.preventDefault();
    if (!editingCard || !newCardFront.trim() || !newCardBack.trim() || !selectedDeck) return;

    updateCard(selectedDeck.id, editingCard.id, {
      front: newCardFront,
      back: newCardBack
    });

    setEditingCard(null);
    setNewCardFront('');
    setNewCardBack('');
  };

  const startEditingCard = (card) => {
    setEditingCard(card);
    setNewCardFront(card.front);
    setNewCardBack(card.back);
  };

  return (
    <div className="flashcard-management">
      <div className="decks-section">
        <h2>Flashcard Decks</h2>
        <form onSubmit={handleCreateDeck} className="deck-form">
          <input
            type="text"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
            placeholder="New deck name..."
            className="deck-input"
          />
          <button type="submit" className="create-deck-btn">Create Deck</button>
        </form>

        <div className="decks-list">
          {decks.map(deck => (
            <div
              key={deck.id}
              className={`deck-item ${selectedDeck?.id === deck.id ? 'selected' : ''}`}
              onClick={() => setSelectedDeck(deck)}
            >
              <div className="deck-info">
                <h3>{deck.name}</h3>
                <span>{deck.cards.length} cards</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDeck(deck.id);
                }}
                className="delete-deck-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedDeck && (
        <div className="cards-section">
          <h2>{selectedDeck.name} - Cards</h2>
          <form onSubmit={editingCard ? handleUpdateCard : handleAddCard} className="card-form">
            <div className="card-inputs">
              <input
                type="text"
                value={newCardFront}
                onChange={(e) => setNewCardFront(e.target.value)}
                placeholder="Front of card..."
                className="card-input"
              />
              <input
                type="text"
                value={newCardBack}
                onChange={(e) => setNewCardBack(e.target.value)}
                placeholder="Back of card..."
                className="card-input"
              />
            </div>
            <button type="submit" className="add-card-btn">
              {editingCard ? 'Update Card' : 'Add Card'}
            </button>
            {editingCard && (
              <button
                type="button"
                onClick={() => {
                  setEditingCard(null);
                  setNewCardFront('');
                  setNewCardBack('');
                }}
                className="cancel-edit-btn"
              >
                Cancel
              </button>
            )}
          </form>

          <div className="cards-list">
            {selectedDeck.cards.map(card => (
              <div key={card.id} className="card-item">
                <div className="card-content">
                  <p><strong>Front:</strong> {card.front}</p>
                  <p><strong>Back:</strong> {card.back}</p>
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => startEditingCard(card)}
                    className="edit-card-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCard(selectedDeck.id, card.id)}
                    className="delete-card-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardManagementPage; 