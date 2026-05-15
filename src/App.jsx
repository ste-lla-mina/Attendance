import React, { useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import LessonTracking from './components/LessonTracking';
import StudentsAttendance from './components/StudentsAttendance';



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
    case 'teachers':
      return <LessonTracking onBack={() => setActiveSection('main')} />;
    case 'students':
      return <StudentsAttendance onBack={() => setActiveSection('main')}  />;
 
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