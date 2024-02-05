// Import necessary dependencies
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'; // Assuming you're using React Router for navigation

// Create the Login component
const Login = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // State to manage successful login and redirection
  const [loggedIn, setLoggedIn] = useState(false);

  // State to manage validation errors
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '', // Clear validation error on input change
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation example (you can implement more complex validation)
    if (!formData.username) {
      setErrors({
        ...errors,
        username: 'Username is required',
      });
      return;
    }

    if (!formData.password) {
      setErrors({
        ...errors,
        password: 'Password is required',
      });
      return;
    }

    // Assuming a successful login for simplicity
    setLoggedIn(true);
  };

  // Redirect to the dashboard if logged in
  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  // Render the login form
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <p className="error">{errors.username}</p>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <p className="error">{errors.password}</p>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
