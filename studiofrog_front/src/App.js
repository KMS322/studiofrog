import "./App.css";
import "./css/fonts.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOAD_LISTS_REQUEST } from "./reducers/videoList.js";
import ScrollToTop from "./scrollToTop";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main/main";
import About from "./components/about/about";
import Portfolio from "./components/portfolio/portfolio";
import Contact from "./components/contact/contact";
import Admin from "./adminComponents/admin.js";
import AdminLogin from "./adminComponents/adminLogin.js";
import AdminSignup from "./adminComponents/adminSignup.js";
import Files from "./adminComponents/files.js";
function App() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState();
  const location = useLocation();
  useEffect(() => {
    const page = location.pathname;
    setCurrentPage(page);
  }, [location]);
  useEffect(() => {
    dispatch({
      type: LOAD_LISTS_REQUEST,
    });
  }, [dispatch]);
  return (
    <>
      <Header page={currentPage} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/adminMain" element={<Admin />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/files/:id" element={<Files />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
