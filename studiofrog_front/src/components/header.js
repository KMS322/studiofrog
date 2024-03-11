import "../css/header.css";
import "../css/header_mobile.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = ({ page }) => {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  return (
    <div className="header">
      <img
        src="/images/header_logo.png"
        alt=""
        onClick={() => {
          navigate("/");
        }}
      />
      <p
        id="pc"
        onClick={() => {
          navigate("/about");
        }}
        style={{ fontWeight: page === "/about" ? "700" : "400" }}
      >
        ABOUT
      </p>
      <p
        id="pc"
        onClick={() => {
          navigate("/portfolio");
        }}
        style={{ fontWeight: page === "/portfolio" ? "700" : "400" }}
      >
        PORTFOLIO
      </p>
      <a
        id="pc"
        href="HTTPS://AUTORO.KR"
        target="_self"
        rel="noopener noreferrer"
      >
        <p>AUTORO</p>
      </a>
      <p
        id="pc"
        onClick={() => {
          navigate("/contact");
        }}
        style={{ fontWeight: page === "/contact" ? "700" : "400" }}
      >
        CONTACT
      </p>
      <img
        id="mobile"
        src="/images/menu_btn.png"
        alt=""
        onClick={() => {
          setOpenNav(!openNav);
        }}
      />
      {openNav ? (
        <div id="mobile" className="mobile_nav">
          <p
            onClick={() => {
              navigate("/about");
              setOpenNav(false);
            }}
          >
            ABOUT
          </p>
          <p
            onClick={() => {
              navigate("/portfolio");
              setOpenNav(false);
            }}
          >
            PORTFOLIO
          </p>
          <a href="HTTPS://AUTORO.KR" target="_self" rel="noopener noreferrer">
            <p>AUTORO</p>
          </a>
          <p
            onClick={() => {
              navigate("/contact");
              setOpenNav(false);
            }}
          >
            CONTACT
          </p>
        </div>
      ) : (
        ""
      )}
      {/* {openNav ? <div id="mobile" className="black"></div> : ""} */}
    </div>
  );
};

export default Header;
