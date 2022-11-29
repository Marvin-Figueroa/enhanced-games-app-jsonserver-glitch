import React, { useCallback, useEffect, useState } from 'react';

import './App.scss';

import GameCardsGrid from './components/GameCardsGrid/GameCardsGrid';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import GameDetails from './components/GameDetails/GameDetails';
import Pagination from './components/Pagination/Pagination';
import Login from './components/Login/Login';
import SearchBar from './components/SearchBar/SearchBar';

import HashLoader from 'react-spinners/HashLoader';

import loginService from './services/login';
import { getPaginatedGames } from './services/games';

function App() {
  const [games, setGames] = useState([]);
  const [gamesCount, setGamesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('games');
  const [selectedGame, setSelectedGame] = useState(null);
  const [currentGamesPage, setCurrentGamesPage] = useState(1);
  const [user, setUser] = useState(null);
  const [gameSearch, setGameSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    getPaginatedGames().then((data) => {
      setGamesCount(data.count);
      setGames(data.results);
      setLoading(false);
      setUser(JSON.parse(window.localStorage.getItem('user')));
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getPaginatedGames(currentGamesPage, 8, gameSearch).then((data) => {
      setGamesCount(data.count);
      setGames(data.results);
      setLoading(false);
    });
  }, [currentGamesPage]);

  useEffect(() => {
    getPaginatedGames(1, 8, gameSearch).then((data) => {
      setGamesCount(data.count);
      setGames(data.results);
    });
  }, [gameSearch]);

  async function handleLogin(credentials) {
    try {
      const user = await loginService.login(credentials);

      if (user) {
        setUser(user);
        window.localStorage.setItem('user', JSON.stringify(user));
        setCurrentPage('games');
      }
    } catch (error) {
      // console.log(error);
    }
  }

  const handleLogout = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem('user');
  }, [setUser]);

  const handleClick = useCallback(
    (currentPage) => {
      setCurrentPage(currentPage);
    },
    [setCurrentPage]
  );

  const handleGameSelect = useCallback(
    (id) => {
      const game = games.find((game) => Number(game.id) === Number(id));
      setSelectedGame(game);
      setCurrentPage('game');
    },
    [games]
  );

  const handlePageChange = useCallback(
    (page) => {
      setCurrentGamesPage(page);
    },
    [setCurrentGamesPage]
  );

  const handleSearch = useCallback(
    (searchQuery) => {
      setGameSearch(searchQuery);
      setCurrentGamesPage(1);
    },
    [setGameSearch, setCurrentGamesPage]
  );

  return (
    <div className='App'>
      <>
        <Navbar
          loggedInUser={user}
          onSignOut={handleLogout}
          handleClick={handleClick}
          currentPage={currentPage}
        />
        <main>
          {(currentPage === 'login' && (
            <Login currentUser={user} onLogin={handleLogin} />
          )) ||
            (currentPage === 'games' && (
              <>
                <SearchBar onSubmitSearch={handleSearch} />
                {loading ? (
                  <HashLoader color='#fb8500' />
                ) : (
                  <GameCardsGrid
                    handleGameSelect={handleGameSelect}
                    games={games}
                  />
                )}
                <Pagination
                  totalItems={gamesCount}
                  pageSize={8}
                  currentPage={currentGamesPage}
                  onPageChange={handlePageChange}
                />
              </>
            )) ||
            (currentPage === 'about' && <About />) ||
            (currentPage === 'game' && (
              <GameDetails user={user} gameId={selectedGame.id} />
            ))}
        </main>
        <Footer />
      </>
    </div>
  );
}

export default App;
