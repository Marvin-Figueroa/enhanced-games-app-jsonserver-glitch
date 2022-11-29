import React from 'react';
import './Navbar.scss';
import { SiNintendogamecube } from 'react-icons/si';
import PropTypes from 'prop-types';

const Navbar = ({ currentPage, loggedInUser, onSignOut, handleClick }) => {
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
        <li className='main-nav__item'>
          {loggedInUser ? (
            <>
              <span className='main-nav__user'>({loggedInUser.username})</span>
              <button
                className='main-nav__link'
                onClick={() => onSignOut(loggedInUser)}>
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
              onClick={() => handleClick('login')}>
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
  loggedInUser: PropTypes.object,
  onSignOut: PropTypes.func.isRequired,
};

export default React.memo(
  Navbar,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.loggedInUser) ===
    JSON.stringify(nextProps.loggedInUser)
);
