import React, { useState } from 'react';
import Auth from './components/Auth';


function App() {
  const [currentPage, setCurrentPage] = useState('auth'); 
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email) => {
    setUserEmail(email); 
    setCurrentPage('app');
  };

  const handleLogout = () => {
    setUserEmail(''); 
    setCurrentPage('auth');
  };

  if (currentPage === 'auth') {
    return <Auth onLoginSuccess={handleLogin} />;
  }
}

export default App;