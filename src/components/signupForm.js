import React, { useState } from 'react';
import '../App.css';

const SignupForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [registered, setRegistered] = useState(false); // Define 'registered' state

  const handleSignup = (e) => {
    e.preventDefault();

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Password length validation
    if (password.length < 4) {
      alert("Password should be at least 4 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Check if the email is already registered
    if (registeredUsers.find(user => user.email === email)) {
      alert("Email already registered. Please login.");
      return;
    }

    // Register the user
    setRegisteredUsers([...registeredUsers, { email, password }]);
    // Reset the form fields after submission
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    // Automatically switch to login form after successful signup
    setRegistered(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the entered email and password match any registered user
    const user = registeredUsers.find(user => user.email === email && user.password === password);
    if (user) {
      // Notify parent component about successful login
      onLogin();
      // Reset the form fields after successful login
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container fade-in">
      <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
        {registered ? 'Welcome Back' : 'Join the Community'}
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
        {registered ? 'Enter your details to access your collection' : 'Discover thousands of free-to-play games'}
      </p>
      
      <form onSubmit={registered ? handleLogin : handleSignup}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength="4"
          />
        </div>
        
        {!registered && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
        )}
        
        <button type="submit" className="btn-submit">
          {registered ? 'Log In' : 'Create Account'}
        </button>
        
        <div style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {registered ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setRegistered(!registered)}
            style={{ 
              color: 'var(--accent-gold)', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {registered ? 'Sign up' : 'Log in'}
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;