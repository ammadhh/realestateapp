import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { houseListStyle, houseCardStyle, houseImageStyle, houseTextStyle, linkStyle } from '../styles/styles';

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('/api/houses');
        const housesWithBids = await Promise.all(response.data.map(async (house) => {
          const bidsResponse = await axios.get(`/api/houses/${house.id}/bids`);
          const highestBid = bidsResponse.data.length > 0 
            ? Math.max(...bidsResponse.data.map(bid => bid.amount))
            : null;
          return { ...house, highestBid };
        }));
        setHouses(housesWithBids);
      } catch (error) {
        console.error('Failed to fetch houses', error);
        setError('Failed to load houses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  if (loading) return <div>Loading houses...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={houseListStyle}>
      {houses.map(house => (
        <Link key={house.id} to={`/house/${house.id}`} style={linkStyle}>
          <div style={houseCardStyle}>
            <img src={house.photo} alt={house.address} style={houseImageStyle} />
            <div style={{ padding: '1rem' }}>
              <h3 style={houseTextStyle}>{house.address}</h3>
              <p style={houseTextStyle}>${house.price.toLocaleString()}</p>
              <p style={houseTextStyle}>
                Highest Bid: {house.highestBid ? `$${house.highestBid.toLocaleString()}` : 'No bids yet'}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HouseList;