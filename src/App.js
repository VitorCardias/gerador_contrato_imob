import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gerador from './pages/Gerador';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gerador />} />
      </Routes>
    </Router>
  );
}

export default App;
