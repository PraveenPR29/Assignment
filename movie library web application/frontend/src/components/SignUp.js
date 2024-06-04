// src/components/SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Check if the email already exists
    const existingEmail = localStorage.getItem('email');
    if (existingEmail === email) {
      setShowErrorMessage(true);
      return;
    }

    // Perform validation for password match
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    // Store the email and password (Example: in local storage)
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Show success message
    setShowSuccessMessage(true);

    // Redirect to sign-in page after a delay
    setTimeout(() => {
      navigate('/signin');
    }, 3000);
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {showSuccessMessage && (
        <div className="success-message">
          Account created successfully. Redirecting to sign-in page...
        </div>
      )}
      {showErrorMessage && (
        <div className="error-message">
          Email already exists. Please use a different email.
        </div>
      )}
      <p>Already have an account? <Link to="/signin">Sign in here</Link>.</p>
    </div>
  );
}

export default SignUp;
