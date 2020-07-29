import React from 'react';
import { Container } from 'react-bootstrap';

import Header from './pages/Header'
import Router from './routes'

import './App.css';

function App() {
  return (
    <main>
      <Container fluid>
        <Header />
        <Router />
      </Container>
    </main>
  );
}

export default App;
