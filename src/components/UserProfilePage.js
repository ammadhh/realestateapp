import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userProfileStyle, houseListStyle, houseCardStyle, houseImageStyle, inputStyle, buttonStyle } from '../styles/styles';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [houses, setHouses] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserAndHouses();
  }, []);

  const fetchUserAndHouses = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const [userResponse, housesResponse] = await Promise.all([
        axios.get('/api/users/current', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get('/api/users/current/houses', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      setUser(userResponse.data);
      setNewUsername(userResponse.data.username);
      setHouses(housesResponse.data);
    } catch (error) {
      console.error('Failed to fetch user profile or houses', error);
      setError('Failed to load profile data. Please try logging in again.');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/current/update', 
        { username: newUsername },
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
      );
      setUser({ ...user, username: newUsername });
      alert('Username updated successfully');
    } catch (error) {
      console.error('Failed to update username', error);
      alert('Failed to update username');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <div style={userProfileStyle}>
      <h2>Your Profile</h2>
      <form onSubmit={handleUsernameChange}>
        <input 
          type="text" 
          value={newUsername} 
          onChange={(e) => setNewUsername(e.target.value)} 
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Update Username</button>
      </form>
      <h3>Your Listed Houses:</h3>
      {houses.length === 0 ? (
        <p>You haven't listed any houses yet.</p>
      ) : (
        <div style={houseListStyle}>
          {houses.map(house => (
            <div key={house.id} style={houseCardStyle}>
              <img src={house.photo} alt={house.address} style={houseImageStyle} />
              <h4>{house.address}</h4>
              <p>${house.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;