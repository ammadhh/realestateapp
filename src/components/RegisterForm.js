import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formStyle, inputStyle, buttonStyle } from '../styles/styles';

const RegisterForm = ({ onRegister, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onRegister(username, password);
    if (success) {
      setUser({ username });
      navigate('/');
    } else {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Register</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required style={inputStyle} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required style={inputStyle} />
      <button type="submit" style={buttonStyle}>Register</button>
    </form>
  );
};

export default RegisterForm;