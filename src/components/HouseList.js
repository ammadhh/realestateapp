import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HouseList = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await axios.get('/api/houses');
      const housesWithBids = await Promise.all(response.data.map(async (house) => {
        const bidsResponse = await axios.get(`/api/houses/${house.id}/bids`);
        const highestBid = bidsResponse.data[0]?.amount || 'No bids yet';
        return { ...house, highestBid };
      }));
      setHouses(housesWithBids);
    } catch (error) {
      console.error('Failed to fetch houses', error);
    }
  };

  return (
    <div>
      {houses.map(house => (
        <div key={house.id}>
          <Link to={`/house/${house.id}`}>
            <img src={house.photo} alt={house.address} style={{ maxWidth: '200px', height: 'auto' }} />
            <h3>{house.address}</h3>
            <p>Price: ${house.price.toLocaleString()}</p>
            <p>Highest Bid: {typeof house.highestBid === 'number' ? `$${house.highestBid.toLocaleString()}` : house.highestBid}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HouseList;