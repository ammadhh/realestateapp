import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import HouseList from './components/HouseList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AddHouseForm from './components/AddHouseForm';
import LearnProcess from './components/LearnProcess';
import InfoBanner from './components/InfoBanner';
import HouseDetail from './components/HouseDetail';
import UserProfile from './components/UserProfile';
import UserProfilePage from './components/UserProfilePage';

const API_BASE_URL = '/api';

const App = () => {
  const [config, setConfig] = useState(null);
  const [houses, setHouses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchConfig();
    fetchHouses();
  }, []);

  const fetchConfig = async () => {
    const response = await axios.get(`${API_BASE_URL}/config`);
    setConfig(response.data);
  };

  const fetchHouses = async () => {
    const response = await axios.get(`${API_BASE_URL}/houses`);
    setHouses(response.data);
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
      setUser(response.data);
      localStorage.setItem('token', response.data.token);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const register = async (username, password) => {
    try {
      await axios.post(`${API_BASE_URL}/register`, { username, password });
      const loginSuccess = await login(username, password);
      return loginSuccess;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    }
  };

  const addHouse = async (address, price, photo) => {
    try {
      const formData = new FormData();
      formData.append('address', address);
      formData.append('price', price);
      formData.append('photo', photo);
      formData.append('user_id', user.id);

      await axios.post(`${API_BASE_URL}/houses`, formData, {
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchHouses();
    } catch (error) {
      console.error('Failed to add house', error);
    }
  };

  if (!config) return <div>Loading...</div>;

  return (
    <Router>
      <div style={{ fontFamily: config.fontFamily, backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
        <Header config={config} user={user} setUser={setUser} />
        <InfoBanner />
        <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
          <Routes>
            <Route path="/" element={<HouseList houses={houses} />} />
            <Route path="/login" element={<LoginForm onLogin={login} setUser={setUser} />} />
            <Route path="/register" element={<RegisterForm onRegister={register} setUser={setUser} />} />
            <Route 
              path="/add-house" 
              element={user ? <AddHouseForm onAddHouse={addHouse} /> : <Navigate to="/login" />} 
            />
            <Route path="/learn" element={<LearnProcess />} />
            <Route path="/house/:id" element={<HouseDetail />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route 
              path="/profile" 
              element={user ? <UserProfilePage /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;