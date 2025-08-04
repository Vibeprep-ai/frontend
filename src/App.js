import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Authentication from './components/Authentication/Authentication';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Redirect any unknown routes to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
