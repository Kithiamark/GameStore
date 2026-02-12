import React, { useState } from 'react';
import './App.css';
import DataFetching from './components/DataFetching';
import SignupForm from './components/signupForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  // State to track user authentication

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app-root">
      {!isLoggedIn && (
        <header style={{ textAlign: 'center', paddingTop: '60px' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>GameStore</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Curated Free-to-Play Experiences</p>
        </header>
      )}
      
      {isLoggedIn ? (
        <DataFetching />
      ) : (
        <SignupForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;