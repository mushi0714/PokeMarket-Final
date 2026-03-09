import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import LoginCard from './components/auth/LoginCard';
import RegisterCard from './components/auth/RegisterCard';
import TrainerCard from './components/user/TrainerCard';
import AdminDashboard from './components/admin/AdminDashboard';
import PokeMarket from './components/market/PokeMarket';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }} className="main-container fade-in">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginCard />} />
              <Route path="/register" element={<RegisterCard />} />
              <Route path="/profile" element={<ProtectedRoute><TrainerCard /></ProtectedRoute>} />
              <Route path="/market" element={<ProtectedRoute><PokeMarket /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
          {/* Toaster limpio para evitar superposiciones de Meowth */}
          <Toaster position="bottom-right" richColors={false} closeButton />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;