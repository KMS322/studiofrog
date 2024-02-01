import "./App.css";
import "./css/fonts.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./scrollToTop";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main/main";
import About from "./components/about/about";
import Portfolio from "./components/portfolio/portfolio";
import Contact from "./components/contact/contact";
function App() {
  const [currentPage, setCurrentPage] = useState();
  const location = useLocation();
  useEffect(() => {
    const page = location.pathname;
    setCurrentPage(page);
  }, [location]);

  return (
    <>
      <Header page={currentPage} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
