import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AllList = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = () => {
    fetch('http://localhost:3001/flashcards')
      .then((response) => response.json())
      .then((data) => setFlashcards(data))
      .catch((error) => console.error('Error fetching flashcards:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/flashcards/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted flashcard from the state
          setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
        } else {
          console.error('Failed to delete flashcard');
        }
      })
      .catch((error) => console.error('Error deleting flashcard:', error));
  };

  return (
    <div className='max-h-screen overflow-auto'>
      <h2 className='text-5xl py-10'>Flashcards</h2>
      <Table>
        <TableCaption>A list of your flashcards.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flashcards.map((flashcard) => (
            <TableRow key={flashcard.id}>
              <TableCell>{flashcard.question}</TableCell>
              <TableCell>{flashcard.answer}</TableCell>
              <TableCell className="text-right">
                <button 
                  onClick={() => handleDelete(flashcard.id)} 
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllList;
