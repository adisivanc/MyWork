import React from "react";
import { useState } from "react";

interface FormData {
  username: string;
  password: string;
}

interface ErrorMsg {
  username: string;
  password: string;
}

const App = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
    username: '',
    password: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (formSubmitted) {
      setErrorMsg({
        ...errorMsg,
        [name]: '',
      });
    }
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset all error messages
    setErrorMsg({
      username: '',
      password: '',
    });

    // Check for empty fields and update error messages
    (Object.keys(formData) as (keyof FormData)[]).forEach((item) => {
      if (!formData[item]) {
        setErrorMsg((prevErrorMsg) => ({
          ...prevErrorMsg,
          [item]: `${item.charAt(0).toUpperCase() + item.slice(1)} is required`,
        }));
      }
    });

    // If there are no errors, proceed with the login
    if (!Object.values(errorMsg).some((msg) => msg !== '')) {
      console.log('Login successful!');
      // Perform login logic here
      // For example, redirect to a dashboard or show a success message to the user
    }

    // Set the formSubmitted flag to true after the form is submitted
    setFormSubmitted(true);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <p className="error">{formSubmitted && errorMsg.username}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <p className="error">{formSubmitted && errorMsg.password}</p>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default App;
