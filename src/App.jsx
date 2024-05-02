import './styles/App.css';
import Navbar from './components/Navbar';
import {Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Mujer from './pages/Mujer';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import Niños from './pages/Niños';
import Hombre from './pages/Hombre';
import LoginAdmin from './components/LoginAdmin';
import AdminComponent from './pages/Admin';
import useAuthVerification from './components/useAuthVerification';

function App() {
  const location = useLocation();
  useAuthVerification();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/hombre" element={<Hombre />} />
        <Route path="/mujer" element={<Mujer />} />
        <Route path="/niños" element={<Niños />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/admin" element={<AdminComponent />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/producto/:productoID" element={<ProductPage />} />
      </Routes>
      <br />
      <Footer />
    </>
  )
}

export default App
