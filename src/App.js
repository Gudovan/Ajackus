
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import './App.css';
function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<UserList/>} /> 
        <Route path="/add" element={<UserForm/>} />
        <Route path="/edit/:id" element={<UserForm/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;