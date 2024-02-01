import "../css/header.css";
import { useNavigate } from "react-router-dom";
const Header = ({ page }) => {
  console.log("page : ", page);
  const navigate = useNavigate();
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
        onClick={() => {
          navigate("/about");
        }}
        style={{ fontWeight: page === "/about" ? "700" : "400" }}
      >
        ABOUT
      </p>
      <p
        onClick={() => {
          navigate("/portfolio");
        }}
        style={{ fontWeight: page === "/portfolio" ? "700" : "400" }}
      >
        PORTFOLIO
      </p>
      <a href="HTTPS://AUTORO.KR" target="_self" rel="noopener noreferrer">
        <p>AUTORO</p>
      </a>
      <p
        onClick={() => {
          navigate("/contact");
        }}
        style={{ fontWeight: page === "/contact" ? "700" : "400" }}
      >
        CONTACT
      </p>
    </div>
  );
};

export default Header;
