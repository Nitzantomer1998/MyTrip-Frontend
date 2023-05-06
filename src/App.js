import './App.css';
import React, { useState } from 'react';
import { UserProvider } from './providers/UserProvider';
import PageRoutes from './pages/PageRoutes';

function App() {
  return (
    <div className='App'>
      <UserProvider>
        <PageRoutes />
      </UserProvider>
    </div>
  );
}

export default App;
