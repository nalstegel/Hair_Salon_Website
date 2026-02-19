import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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


const ScrollToHashElement = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0); 
    }
  }, [hash]);

  return null;
};

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToHashElement />
        <div className="App flex-wrapper">
          <Navbar />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/storitve" element={<Services />} />
              <Route path="/o-nas" element={<About />} />
              <Route path="/darila" element={<Gifts />} />
              <Route path="/rezervacija" element={<Booking />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="rezervacije" element={<AdminReservations />} />
                      <Route path="blog" element={<AdminBlog />} />
                  </Route>
              </Route>
            </Routes>
            
          </main>
          
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;