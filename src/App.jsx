
import './App.css'
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { Routes, Route } from 'react-router-dom';
import TicketPage from './pages/TicketPage';

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ticket" element={<TicketPage />} />
      {/* Optional: redirect unknown routes */}
      {/* <Route path="*" element={<LandingPage />} /> */}

    </Routes>
    
  )
}

export default App
