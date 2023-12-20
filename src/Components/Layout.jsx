// Layout.jsx
import React from 'react';
import NavBar from './NavBar';

function Layout({ children, toggleDarkMode }) {
  return (
    <div className="layout">
      <NavBar toggleDarkMode={toggleDarkMode} />
      {children}
    </div>
  );
}

export default Layout;
