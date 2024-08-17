import React from 'react';
import { Link } from 'react-router-dom';
import { headerStyle, navLinkStyle, logoutButtonStyle } from '../styles/styles';

const Header = ({ config, user, setUser }) => (
  <header style={headerStyle(config)}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: 'white', margin: 0 }}>{config.appName}</h1>
      <nav>
        <Link to="/" style={navLinkStyle}>Home</Link>
        {user ? (
          <>
            <Link to="/add-house" style={navLinkStyle}>Add House</Link>
            <Link to="/profile" style={navLinkStyle}>Profile</Link>
            <button onClick={() => setUser(null)} style={logoutButtonStyle(config)}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={navLinkStyle}>Login</Link>
            <Link to="/register" style={navLinkStyle}>Register</Link>
          </>
        )}
      </nav>
    </div>
  </header>
);

export default Header;