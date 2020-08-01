import React from 'react';

import Header from './pages/Header'
import Router from './routes'

import './App.css';

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
