import React from 'react';
import {BrowserRouter as Routes } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import Header from './components/Header';



function App() {
  
  return <>
   
      <Routes>
        <Header />
        <AppRoutes />
      </Routes>
   
  </>
}

export default App;
