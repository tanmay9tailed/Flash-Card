import React from "react";
import FlashcardList from "./components/component/FlashcardList";
import { ModeToggle } from "./components/ui/mode-toggle";
import { Spotlight } from "./components/ui/Spotlight";
import { useTheme } from "./components/theme-provider";
import { CardHeader } from "./components/ui/card";
import { BorderCard } from "./components/ui/moving-border";
import { Button } from "./components/ui/button";
import { Link, Routes, Route } from "react-router-dom";
import FlashcardForm from "./components/component/FlashCardForm";
import AllList from "./components/component/AllList";
import AdminLogin from "./components/component/AdminLogin";
import { useAuth } from "./components/AuthContext";

function App() {
  const { theme } = useTheme();
  const spotlightFill = theme === "light" ? "black" : "white";

  const { isAuthenticated, logout } = useAuth(); 

  return (
    <div className="relative h-screen w-full p-4 overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill={spotlightFill} />
      <ModeToggle className="absolute top-6 right-6 z-10" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="space-y-20">
              <h1 className="pt-20 md:pt-20 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500 text-center h-48">
                Flashcard Learning Tool
              </h1>
              <div className="w-[90%] sm:w-full flex justify-center items-center mx-auto">
                <div className="">
                  <BorderCard duration="4000">
                    <CardHeader>
                      <FlashcardList />
                    </CardHeader>
                  </BorderCard>
                </div>
                {!isAuthenticated && (
                  <div className="absolute top-6 left-6 z-10">
                    <Button asChild>
                      <Link to="/adminlogin">Login Administrator</Link>
                    </Button>
                  </div>
                )}
                {isAuthenticated && (
                  <div className="flex sm:gap-2 absolute top-6 left-6 z-10">
                    <Button asChild onClick={logout} className="bg-red-600 text-white hover:bg-red-700 scale-75 sm:scale-100">
                      <Link to="/">Logout</Link>
                    </Button>
                    <Button asChild className="scale-75 sm:scale-100">
                      <Link to="/alllist">Edit</Link>
                    </Button>
                    <Button asChild className="scale-75 sm:scale-100">
                      <Link to="/addflashcard">Add FlashCard</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          }
        />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/alllist" element={<AllList />} />
        <Route path="/addflashcard" element={<FlashcardForm />} />
      </Routes>
    </div>
  );
}

export default App;
