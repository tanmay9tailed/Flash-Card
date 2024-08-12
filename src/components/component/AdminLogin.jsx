import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://flash-card-backend-mongo.vercel.app/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage("Login successful");
          setColor("green");
          login(); 
          navigate("/"); // Redirect after login
        } else {
          setMessage("Invalid credentials");
          setColor("red");
        }
      })
      .catch((error) => console.error("Error logging in:", error));
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-20 block w-full px-5 sm:w-1/4 ">
        <h2 className="text-5xl">Admin Login</h2>
        <div className="space-y-7">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">Username:</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              placeholder="Username..."
              type="text"
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              placeholder="Password..."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Login</Button>
        </div>
        {message && <p className={`text-${color}-600 pl-2`}>{message}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
