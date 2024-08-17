import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const HouseDetail = () => {
  const [house, setHouse] = useState(null);
  const [bids, setBids] = useState([]);
  const [newBid, setNewBid] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchHouseAndBids();
  }, [id]);

  const fetchHouseAndBids = async () => {
    try {
      const [houseResponse, bidsResponse] = await Promise.all([
        axios.get(`/api/houses/${id}`),
        axios.get(`/api/houses/${id}/bids`)
      ]);
      setHouse(houseResponse.data);
      setBids(bidsResponse.data);
    } catch (error) {
      console.error('Failed to fetch house details or bids', error);
    }
  };

  const placeBid = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/houses/${id}/bids`, { amount: parseFloat(newBid) }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setNewBid('');
      fetchHouseAndBids();
    } catch (error) {
      console.error('Failed to place bid', error);
    }
  };

  if (!house) return <div>Loading...</div>;

  return (
    <div>
      <img src={house.photo} alt={house.address} style={{ maxWidth: '100%', height: 'auto' }} />
      <h2>{house.address}</h2>
      <p>Price: ${house.price.toLocaleString()}</p>
      <h3>Bids:</h3>
      <ul>
        {bids.map(bid => (
          <li key={bid.id}>
            ${bid.amount.toLocaleString()} by {bid.user} at {new Date(bid.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      <form onSubmit={placeBid}>
        <input
          type="number"
          value={newBid}
          onChange={(e) => setNewBid(e.target.value)}
          placeholder="Enter your bid"
          step="0.01"
          min={house.price}
          required
        />
        <button type="submit">Place Bid</button>
      </form>
    </div>
  );
};

export default HouseDetail;