import React, { useState } from 'react';

function AdminDashboard({ flashcards, setFlashcards }) {
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });

  const handleAddFlashcard = () => {
    setFlashcards([...flashcards, newFlashcard]);
    setNewFlashcard({ question: '', answer: '' });
  };

  const handleDeleteFlashcard = (index) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input
        type="text"
        placeholder="Question"
        value={newFlashcard.question}
        onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
      />
      <input
        type="text"
        placeholder="Answer"
        value={newFlashcard.answer}
        onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
      />
      <button onClick={handleAddFlashcard}>Add Flashcard</button>

      <ul>
        {flashcards.map((flashcard, index) => (
          <li key={index}>
            {flashcard.question} - {flashcard.answer}
            <button onClick={() => handleDeleteFlashcard(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
