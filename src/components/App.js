import React, { useState } from 'react';
import './../styles/App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const validateName = (name) => {
    if (name.length === 0) {
      return 'Name is required';
    } else if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (email.length === 0) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password.length === 0) {
      return 'Password is required';
    } else if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    // Real-time validation
    let error = '';
    if (id === 'name') {
      error = validateName(value);
    } else if (id === 'email') {
      error = validateEmail(value);
    } else if (id === 'password') {
      error = validatePassword(value);
    }

    setErrors(prev => ({ ...prev, [id]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError
    });

    if (!nameError && !emailError && !passwordError) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div>
      <h1>Real-Time Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
