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
import { getPaginatedGames } from './services/games';
import { useAuth } from './hooks/useAuthv2';

function App() {
  const [games, setGames] = useState([]);
  const [gamesCount, setGamesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('games');
  const [selectedGame, setSelectedGame] = useState(null);
  const [currentGamesPage, setCurrentGamesPage] = useState(1);
  const [gameSearch, setGameSearch] = useState('');
  const [error, setError] = useState(null);

  const { login, user, logOut } = useAuth();

  useEffect(() => {
    setLoading(true);
    getPaginatedGames()
      .then((data) => {
        setGamesCount(data.count);
        setGames(data.results);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError('something went wrong');
      });
  }, []);

  async function handleLogin(credentials) {
    login(credentials).then((user) => {
      if (user) {
        setCurrentPage('games');
      }
    });
  }

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
      setLoading(true);
      getPaginatedGames(page, 8, gameSearch).then((data) => {
        setGamesCount(data.count);
        setGames(data.results);
        setLoading(false);
      });
      setCurrentGamesPage(page);
    },
    [setCurrentGamesPage]
  );

  const handleSearch = useCallback(
    (searchQuery) => {
      setLoading(true);
      getPaginatedGames(1, 8, searchQuery).then((data) => {
        setGamesCount(data.count);
        setGames(data.results);
        setLoading(false);
      });
      setGameSearch(searchQuery);
      setCurrentGamesPage(1);
    },
    [setGameSearch, setCurrentGamesPage]
  );

  return (
    <div className="App">
      <>
        <Navbar
          loggedInUser={user}
          onSignOut={logOut}
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
                {error ? <div className="error">{error}</div> : null}
                {loading ? (
                  <HashLoader color="#fb8500" />
                ) : (
                  <GameCardsGrid
                    handleGameSelect={handleGameSelect}
                    games={games}
                  />
                )}
                <Pagination
                  totalItems={gamesCount}
                  pageSize={8000}
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
