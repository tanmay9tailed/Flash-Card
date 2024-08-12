import React, { useState } from "react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import "./Flashcard.css"; // Import the CSS file

function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={`relative w-72 h-48 perspective-1000 cursor-pointer ${flip ? "flipped" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d">
        {/* Answer side (back) */}
        <div className="absolute w-full h-full flex items-center justify-center rotate-y-180 backface-hidden">
          <CardDescription className="card-back-content">{flashcard.answer}</CardDescription>
        </div>
        {/* Question side (front) */}
        <div className="absolute w-full h-full flex items-center justify-center backface-hidden">
          <CardTitle className="text-4xl font-mono">{flashcard.question}</CardTitle>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
