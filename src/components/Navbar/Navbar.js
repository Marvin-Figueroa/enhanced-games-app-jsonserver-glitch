import "./Navbar.scss";
import { SiNintendogamecube } from "react-icons/si";

const Navbar = (props) => {
  return (
    <nav className="main-nav">
      <div
        onClick={() => props.handleClick("games")}
        className="main-nav__logo"
      >
        <SiNintendogamecube /> <span>LOGO</span>
      </div>
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <button
            onClick={() => props.handleClick("games")}
            className={
              props.currentPage === "games"
                ? "main-nav__link current"
                : "main-nav__link"
            }
          >
            Games
          </button>
        </li>
        <li className="main-nav__item">
          <button
            onClick={() => props.handleClick("about")}
            className={
              props.currentPage === "about"
                ? "main-nav__link current"
                : "main-nav__link"
            }
          >
            About
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
