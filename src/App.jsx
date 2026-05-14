import React, { useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';


function App() {
  const [currentPage, setCurrentPage] = useState('auth'); 
  const [activeSection, setActiveSection] = useState('main'); 
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email) => {
    setUserEmail(email); 
    setCurrentPage('app');
  };

  const handleLogout = () => {
    setUserEmail(''); 
    setCurrentPage('auth');
    setActiveSection('main');
  };

  if (currentPage === 'auth') {
    return <Auth onLoginSuccess={handleLogin} />;
  }

  switch (activeSection) {
    case 'tickets':
      return <TicketSection onBack={() => setActiveSection('main')} />;
    case 'money':
      return <MoneySection onBack={() => setActiveSection('main')}  />;
    case 'phones':
      return <PhoneSection onBack={() => setActiveSection('main')}/>;
    case 'attendance':
      return <Attendance onBack={()=>setActiveSection('main')}/>;
    default:
      return (
        <Dashboard 
          userEmail={userEmail} 
          onLogout={handleLogout} 
          onSectionClick={(sectionName) => setActiveSection(sectionName)} 
        />
      );
  }
}

export default App;