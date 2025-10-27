
import './App.css'
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { Routes, Route, useLocation } from 'react-router-dom';
import TicketPage from './pages/TicketPage';
import Footer from './Components/layout/Footer';

function App() {
  

    const location = useLocation();
  
  // Hide footer on certain pages if you want
  const hideFooter = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ticket" element={<TicketPage />} />
        </Routes>
      </div>

      {!hideFooter && <Footer />}
    </div>
  
    
  )
}

export default App
