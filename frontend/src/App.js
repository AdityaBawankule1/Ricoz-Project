import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Trainers from './pages/Trainers';
import TrainerDetails from './pages/TrainerDetails';
import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';
import ServicesPage from './pages/ServicesPage';
import Login from './pages/Login';

const STORAGE_KEY = 'kindPawsUser';

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentUser]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={Boolean(currentUser)}>
              <>
                <Navbar currentUser={currentUser} onLogout={handleLogout} />
                <Home />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/trainers"
          element={
            <ProtectedRoute isAuthenticated={Boolean(currentUser)}>
              <>
                <Navbar currentUser={currentUser} onLogout={handleLogout} />
                <Trainers />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute isAuthenticated={Boolean(currentUser)}>
              <>
                <Navbar currentUser={currentUser} onLogout={handleLogout} />
                <ServicesPage />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute isAuthenticated={Boolean(currentUser)}>
              <>
                <Navbar currentUser={currentUser} onLogout={handleLogout} />
                <Booking />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute isAuthenticated={Boolean(currentUser)}>
              <>
                <Navbar currentUser={currentUser} onLogout={handleLogout} />
                <About />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute isAuthenticated={Boolean(currentUser)}>
              <>
                <Navbar currentUser={currentUser} onLogout={handleLogout} />
                <Contact />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/trainer/:id"
          element={
            <ProtectedRoute isAuthenticated={Boolean(currentUser)}>
              <>
                <Navbar currentUser={currentUser} onLogout={handleLogout} />
                <TrainerDetails />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;