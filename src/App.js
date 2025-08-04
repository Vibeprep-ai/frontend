import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Authentication from './components/Authentication/Authentication';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/auth" element={<Authentication />} />
          <Route path="/dashboard" element={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h1>Welcome to Dashboard!</h1>
              <p>You are successfully logged in.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
