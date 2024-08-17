import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { userProfileStyle, houseListStyle, houseCardStyle, houseImageStyle, linkStyle } from '../styles/styles';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [houses, setHouses] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserAndHouses = async () => {
      try {
        const userResponse = await axios.get(`/api/users/${id}`);
        setUser(userResponse.data);
        const housesResponse = await axios.get(`/api/users/${id}/houses`);
        setHouses(housesResponse.data);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      }
    };
    fetchUserAndHouses();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={userProfileStyle}>
      <h2>{user.name || user.username}'s Profile</h2>
      <h3>Listed Houses:</h3>
      <div style={houseListStyle}>
        {houses.map(house => (
          <div key={house.id} style={houseCardStyle}>
            <Link to={`/house/${house.id}`} style={linkStyle}>
              <img src={house.photo} alt={house.address} style={houseImageStyle} />
              <h4>{house.address}</h4>
              <p>${house.price.toLocaleString()}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;