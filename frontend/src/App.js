import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import { AuthProvider } from './components/AuthContext';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;