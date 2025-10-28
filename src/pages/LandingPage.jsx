import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-900">
      <header className="  border-b border-gray-800">
        <nav className="flex justify-between items-center max-w-[1440px] mx-auto px-4 py-4" aria-label="Main navigation">
          <div className="text-2xl font-bold text-blue-400">TicketFlow</div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-blue-400 hover:text-blue-300 font-medium transition cursor-pointer"
              aria-label="Go to login page"
            >
              Login
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section 
          className="relative max-w-[1440px] mx-auto px-6 py-[150px] overflow-hidden flex flex-col justify-center items-center"
          aria-labelledby="hero-heading"
        >
          <div 
            className="absolute top-10 right-10 w-64 h-64 bg-purple-600/40 rounded-full opacity-30 blur-lg"
            aria-hidden="true"
          ></div>
          <div 
            className="absolute bottom-40 left-10 w-48 h-48 bg-blue-500/30 rounded-full opacity-40 blur-lg"
            aria-hidden="true"
          ></div>

          <div className="relative z-10 text-center max-w-4xl mx-auto text-gray-200">
            <h1 id="hero-heading" className="text-5xl md:text-6xl font-bold mb-6">
              Manage Your Tickets
              <span className="block text-blue-400">Effortlessly</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Streamline your workflow with our powerful ticket management system. 
              Create, track, and resolve tickets with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl cursor-pointer"
                aria-label="Sign up for TicketFlow"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 text-white rounded-lg font-semibold hover:bg-gray-500 transition border-2 border-gray-500 cursor-pointer"
                aria-label="Login to your account"
              >
                Login
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path 
                fill="#1e3a8a" 
                fillOpacity="1" 
                d="M0,32L48,58.7C96,85,192,139,288,181.3C384,224,480,256,576,229.3C672,203,768,117,864,85.3C960,53,1056,75,1152,69.3C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>

        <section 
          className="max-w-[1440px] h-full mx-auto px-6 py-20"
          aria-labelledby="features-heading"
        >
          <h2 id="features-heading" className="text-4xl font-bold text-center text-gray-100 mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            <article className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Creation</h3>
              <p className="text-gray-600">
                Create and assign tickets in seconds with our intuitive interface
              </p>
            </article>

            <article className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Updates</h3>
              <p className="text-gray-600">
                Track ticket status changes and updates as they happen
              </p>
            </article>

            <article className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics</h3>
              <p className="text-gray-600">
                Get insights into your team's performance and ticket metrics
              </p>
            </article>
          </div>
        </section>
      </main>
      
    </div>
  );
}