import { NavLink } from "react-router-dom";
import CryptoLogin from "../crypto-login/CryptoLogin";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <NavLink
          className={(navData) =>
            navData.isActive ? "nav-item-active" : "nav-item"
          }
          to="/"
        >
          Auction
        </NavLink>
        <NavLink
          className={(navData) =>
            navData.isActive ? "nav-item-active" : "nav-item"
          }
          to="/profile"
        >
          Profile
        </NavLink>
        <CryptoLogin />
      </nav>
    </div>
  );
};

export default Navbar;
