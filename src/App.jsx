import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Footer from './components/Footer';
import About from './pages/About';
import Gifts from './pages/Gifts';
import Booking from './pages/Booking';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminReservations from './admin/AdminReservations';
import Dashboard from './admin/Dashboard';
import AdminLayout from './admin/AdminLayout';
import { LanguageProvider } from './context/LanguageContext';
import Login from './admin/Login';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminBlog from './admin/AdminBlog';
import AdminLoyalty from './admin/AdminLoyalty';

const ScrollToHashElement = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0); 
    }
  }, [pathname, hash]);

  return null;
};

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToHashElement />
        <div className="App flex-wrapper">
          <main className="main-content">
            
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/storitve" element={<Services />} />
                <Route path="/o-nas" element={<About />} />
                <Route path="/darila" element={<Gifts />} />
                {/* --- ZAČASNO IZKLOPLJENA JAVNA REZERVACIJA ---
                <Route path="/rezervacija" element={<Booking />} /> 
                ---------------------------------------------- */}
                <Route path="/rezervacija" element={<Navigate to="/" replace />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
              </Route>

              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<Dashboard />} />
                      {/* --- ZAČASNO IZKLOPLJEN ADMIN ZA REZERVACIJE ---
                      <Route path="rezervacije" element={<AdminReservations />} />
                      ------------------------------------------------ */}
                      <Route path="rezervacije" element={<Navigate to="/admin" replace />} />
                      <Route path="blog" element={<AdminBlog />} />
                      <Route path="loyalty" element={<AdminLoyalty />} />
                  </Route>
              </Route>
            </Routes>
            
          </main>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;