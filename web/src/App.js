import React from 'react';

import Header from './pages/Header'
import Router from './routes'

import './assets/styles/global.css';


function App() {
  return (
    <main>
      <React.Fragment>
        <Header />
        <Router />
      </React.Fragment>
    </main>
  );
}

export default App;
