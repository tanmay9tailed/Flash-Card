import React, { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import { Button } from "../ui/button";

function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = () => {
    fetch("https://flash-card-backend-mongo.vercel.app/flashcards")
      .then((response) => response.json())
      .then((data) => {
        setFlashcards(data);
        setIndex(0); // Reset index after fetching new data
      })
      .catch((error) => console.error("Error fetching flashcards:", error));
  };

  const handleNext = () => setIndex((index + 1) % flashcards.length);
  const handlePrev = () => setIndex((index - 1 + flashcards.length) % flashcards.length);

  return (
    <div className="w-full h-full flex flex-col justify-between space-y-16 transition-all items-center">
      {flashcards.length > 0 ? (
        <>
          <Flashcard flashcard={flashcards[index]} />
          <div className="w-full flex justify-between space-x-2 sm:space-x-20">
            <Button onClick={handlePrev} className="scale-90 sm:scale-100">Previous Question</Button>
            <Button onClick={handleNext} className="scale-90 sm:scale-100">Next Question</Button>
          </div>
        </>
      ) : (
        <p>No flashcards available</p>
      )}
    </div>
  );
}

export default FlashcardList;
