import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const HouseDetail = () => {
  const [house, setHouse] = useState(null);
  const [bids, setBids] = useState([]);
  const [comments, setComments] = useState([]);
  const [newBid, setNewBid] = useState('');
  const [newComment, setNewComment] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchHouseAndBids();
    fetchComments();
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

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/houses/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments', error);
    }
  };

  const placeBid = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/houses/${id}/bids`, 
        { amount: parseFloat(newBid) },
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
      );
      setNewBid('');
      fetchHouseAndBids();
    } catch (error) {
      console.error('Failed to place bid', error);
      alert('Failed to place bid. Please make sure you are logged in and try again.');
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/houses/${id}/comments`, 
        { content: newComment },
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
      );
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Failed to add comment', error);
      alert('Failed to add comment. Please make sure you are logged in and try again.');
    }
  };

  if (!house) return <div className="text-center mt-8">Loading...</div>;

  const highestBid = bids.length > 0 ? Math.max(...bids.map(bid => bid.amount)) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={house.photo} alt={house.address} className="w-full h-96 object-cover" />
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4">{house.address}</h2>
          <div className="flex justify-between items-center mb-6">
            <p className="text-2xl text-gray-700">Price: ${house.price.toLocaleString()}</p>
            {highestBid && (
              <p className="text-2xl text-green-600 font-semibold">
                Highest Bid: ${highestBid.toLocaleString()}
              </p>
            )}
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Place a Bid</h3>
            <form onSubmit={placeBid} className="flex items-center">
              <input
                type="number"
                value={newBid}
                onChange={(e) => setNewBid(e.target.value)}
                placeholder="Enter your bid"
                step="0.01"
                min={highestBid ? highestBid + 1 : house.price}
                required
                className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Place Bid
              </button>
            </form>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Bid History</h3>
            {bids.length > 0 ? (
              <ul className="space-y-2">
                {bids.map(bid => (
                  <li key={bid.id} className="bg-gray-100 p-3 rounded">
                    <span className="font-semibold">${bid.amount.toLocaleString()}</span> by {bid.user} 
                    <span className="text-gray-500 ml-2 text-sm">{new Date(bid.timestamp).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No bids yet.</p>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Comments</h3>
            {comments.length > 0 ? (
              <ul className="space-y-4">
                {comments.map(comment => (
                  <li key={comment.id} className="bg-gray-100 p-4 rounded">
                    <p className="mb-2">{comment.content}</p>
                    <p className="text-sm text-gray-500">
                      By {comment.user} on {new Date(comment.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
            <form onSubmit={addComment} className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              <button type="submit" className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                Add Comment
              </button>
            </form>
          </div>
        </div>
      </div>
      <Link to="/" className="block mt-6 text-center text-blue-500 hover:underline">Back to Houses</Link>
    </div>
  );
};

export default HouseDetail;