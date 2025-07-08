import { useState, useEffect } from 'react';

const useFlashcards = () => {
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);

  useEffect(() => {
    const savedDecks = localStorage.getItem('flashcard_decks');
    if (savedDecks) {
      setDecks(JSON.parse(savedDecks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('flashcard_decks', JSON.stringify(decks));
  }, [decks]);

  const createDeck = (name) => {
    const newDeck = {
      id: Date.now(),
      name,
      cards: [],
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    setDecks([...decks, newDeck]);
    return newDeck;
  };

  const updateDeck = (deckId, updates) => {
    setDecks(decks.map(deck =>
      deck.id === deckId
        ? { ...deck, ...updates, lastModified: new Date().toISOString() }
        : deck
    ));
  };

  const deleteDeck = (deckId) => {
    setDecks(decks.filter(deck => deck.id !== deckId));
    if (selectedDeck?.id === deckId) {
      setSelectedDeck(null);
    }
  };

  const addCard = (deckId, { front, back }) => {
    const card = {
      id: Date.now(),
      front,
      back,
      createdAt: new Date().toISOString(),
      lastReviewed: null,
      reviewCount: 0
    };

    setDecks(decks.map(deck =>
      deck.id === deckId
        ? {
            ...deck,
            cards: [...deck.cards, card],
            lastModified: new Date().toISOString()
          }
        : deck
    ));

    return card;
  };

  const updateCard = (deckId, cardId, updates) => {
    setDecks(decks.map(deck =>
      deck.id === deckId
        ? {
            ...deck,
            cards: deck.cards.map(card =>
              card.id === cardId
                ? { ...card, ...updates }
                : card
            ),
            lastModified: new Date().toISOString()
          }
        : deck
    ));
  };

  const deleteCard = (deckId, cardId) => {
    setDecks(decks.map(deck =>
      deck.id === deckId
        ? {
            ...deck,
            cards: deck.cards.filter(card => card.id !== cardId),
            lastModified: new Date().toISOString()
          }
        : deck
    ));
  };

  return {
    decks,
    selectedDeck,
    setSelectedDeck,
    createDeck,
    updateDeck,
    deleteDeck,
    addCard,
    updateCard,
    deleteCard
  };
};

export default useFlashcards; 