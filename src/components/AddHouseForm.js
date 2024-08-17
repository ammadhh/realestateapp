import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formStyle, inputStyle, buttonStyle } from '../styles/styles';

const AddHouseForm = ({ onAddHouse }) => {
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAddHouse(address, parseFloat(price), photo);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Add a New House</h2>
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required style={inputStyle} />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required style={inputStyle} />
      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} accept="image/*" required style={inputStyle} />
      <button type="submit" style={buttonStyle}>Add House</button>
    </form>
  );
};

export default AddHouseForm;