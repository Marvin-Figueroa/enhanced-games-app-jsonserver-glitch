import React, { useEffect, useRef, useState } from 'react';

import HttpClient from './services/http';

import './App.scss';

import GameCardsGrid from './components/GameCardsGrid/GameCardsGrid';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import GameDetails from './components/GameDetails/GameDetails';
import Pagination from './components/Pagination/Pagination';

import HashLoader from 'react-spinners/HashLoader';

const apiUrl = process.env.REACT_APP_API_BASE_URL;
const resource = '/games?page=1&page_size=8&key=';
// const resource = '/games?_page=1&_limit=8&key=';
const apiKey = process.env.REACT_APP_API_KEY;
// const fullUrl = apiUrl + resource + apiKey;

const http = new HttpClient();

// const http = new HttpClient('https://plume-gelatinous-asp.glitch.me');

function App() {
  const gamesCount = useRef();
  const [games, setGames] = useState([]);
  // const [gamesCount, setGamesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('games');
  const [selectedGame, setSelectedGame] = useState(null);
  const [currGamesPage, setCurrGamesPage] = useState(1);

  useEffect(() => {
    getGames();
  }, []);

  useEffect(() => {
    getPaginatedGames(currGamesPage);
  }, [currGamesPage]);

  async function getGames() {
    setLoading(true);
    const gamesResult = await http.get(apiUrl + resource + apiKey);
    // console.log(http.baseURL);
    // console.log(resource + apiKey);

    gamesCount.current = gamesResult.count;
    // const gamesList = await res.json();

    setGames(gamesResult.results);
    setLoading(false);
  }

  function handleClick(currentPage) {
    setCurrentPage(currentPage);
  }

  function handleGameSelect(id) {
    const game = games.find((game) => Number(game.id) === Number(id));
    setSelectedGame(game.id);
    setCurrentPage('game');
  }

  function handlePageChange(page) {
    setCurrGamesPage(page);
  }

  async function getPaginatedGames(page) {
    const nextGames = await http.get(
      apiUrl + `/games?page=${page}&page_size=8&key=` + apiKey
    );
    setGames(nextGames.results);
  }

  return (
    <div className='App'>
      {loading ? (
        <HashLoader color='#fb8500' />
      ) : (
        <>
          <Navbar handleClick={handleClick} currentPage={currentPage} />
          <main>
            {(currentPage === 'games' && (
              <GameCardsGrid
                handleGameSelect={handleGameSelect}
                games={games}
              />
            )) ||
              (currentPage === 'about' && <About />) ||
              (currentPage === 'game' && <GameDetails gameId={selectedGame} />)}
          </main>
          {currentPage === 'games' && (
            <Pagination
              totalItems={828995}
              pageSize={8}
              currentPage={currGamesPage}
              onPageChange={handlePageChange}
            />
          )}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
