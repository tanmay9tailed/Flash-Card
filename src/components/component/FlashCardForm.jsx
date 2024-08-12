// FlashcardForm.js
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FlashcardForm = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Flashcard added:", result);
        // Clear the form
        setQuestion("");
        setAnswer("");
      } else {
        console.error("Failed to add flashcard");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <form onSubmit={handleSubmit} className="space-y-6 block w-full px-5 sm:w-1/4 ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="question">Question</Label>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              type="text"
              id="question"
              placeholder="Type Your Question here..."
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="answer">Answer:</Label>
            <Input
              id="answer"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type Your Answer here..."
              required
            />
          </div>
          <Button type="submit">Add Flashcard</Button>
        </form>
      </div>
    </>
  );
};

export default FlashcardForm;
