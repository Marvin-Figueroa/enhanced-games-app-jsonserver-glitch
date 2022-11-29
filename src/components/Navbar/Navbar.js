import React from 'react';
import './Navbar.scss';
import { SiNintendogamecube } from 'react-icons/si';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuthv2';

const Navbar = ({ currentPage, onSignOut, handleClick }) => {
  const { user } = useAuth();
  return (
    <nav className="main-nav">
      <div onClick={() => handleClick('games')} className="main-nav__logo">
        <SiNintendogamecube /> <span>LOGO</span>
      </div>
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <button
            onClick={() => handleClick('games')}
            className={
              currentPage === 'games'
                ? 'main-nav__link current'
                : 'main-nav__link'
            }
          >
            Games
          </button>
        </li>
        <li className="main-nav__item">
          <button
            onClick={() => handleClick('about')}
            className={
              currentPage === 'about'
                ? 'main-nav__link current'
                : 'main-nav__link'
            }
          >
            About
          </button>
        </li>
        <li className="main-nav__item">
          {user ? (
            <>
              <span className="main-nav__user">({user.username})</span>
              <button
                className="main-nav__link"
                onClick={() => onSignOut(user)}
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              className={
                currentPage === 'login'
                  ? 'main-nav__link current'
                  : 'main-nav__link'
              }
              onClick={() => handleClick('login')}
            >
              Log In
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  currentPage: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default Navbar;
