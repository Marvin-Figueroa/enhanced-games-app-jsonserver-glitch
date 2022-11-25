import './Navbar.scss';
import { SiNintendogamecube } from 'react-icons/si';
import PropTypes from 'prop-types';

const Navbar = ({ currentPage, handleClick }) => {
  return (
    <nav className='main-nav'>
      <div onClick={() => handleClick('games')} className='main-nav__logo'>
        <SiNintendogamecube /> <span>LOGO</span>
      </div>
      <ul className='main-nav__list'>
        <li className='main-nav__item'>
          <button
            onClick={() => handleClick('games')}
            className={
              currentPage === 'games'
                ? 'main-nav__link current'
                : 'main-nav__link'
            }>
            Games
          </button>
        </li>
        <li className='main-nav__item'>
          <button
            onClick={() => handleClick('about')}
            className={
              currentPage === 'about'
                ? 'main-nav__link current'
                : 'main-nav__link'
            }>
            About
          </button>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  currentPage: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Navbar;
