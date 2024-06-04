import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signin.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    // Check if the email and password match (Example: in local storage)
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (email === storedEmail && password === storedPassword) {
      // Redirect to the home page after successful sign-in
      navigate('/home'); // Ensure this matches your route
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSignIn}>
        <h2>Sign In</h2>
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
        <button type="submit">Sign In</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <p>Don't have an account? <Link to="/signup">Sign up here</Link>.</p>
    </div>
  );
}

export default SignIn;
