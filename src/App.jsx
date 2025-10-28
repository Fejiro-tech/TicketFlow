import './App.css'
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TicketPage from './pages/TicketPage';
import Footer from './Components/layout/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <div className="grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ticket" element={<TicketPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
