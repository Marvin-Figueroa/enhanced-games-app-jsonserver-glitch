import React, { useEffect, useState } from "react";

import HttpClient from "./services/http";

import "./App.scss";

import GameCardsGrid from "./components/GameCardsGrid/GameCardsGrid";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import GameDetails from "./components/GameDetails/GameDetails";
import Pagination from "./components/Pagination/Pagination";

import HashLoader from "react-spinners/HashLoader";

const http = new HttpClient("https://plume-gelatinous-asp.glitch.me");

function App() {
  const [games, setGames] = useState([]);
  const [gamesCount, setGamesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState("games");
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
    const res = await http.get("/games?_page=1&_limit=8", {
      parseResponse: false,
    });

    setGamesCount(Number(res.headers.get("x-total-count")));
    const gamesList = await res.json();

    setGames(gamesList);
    setLoading(false);
  }

  function handleClick(currentPage) {
    setCurrentPage(currentPage);
  }

  function handleGameSelect(id) {
    const game = games.find((game) => Number(game.id) === Number(id));
    setSelectedGame(game);
    setCurrentPage("game");
  }

  function handlePageChange(page) {
    setCurrGamesPage(page);
  }

  async function getPaginatedGames(page) {
    const newGames = await http.get(`/games?_page=${page}&_limit=8`);
    setGames(newGames);
  }

  return (
    <div className="App">
      {loading ? (
        <HashLoader color="#fb8500" />
      ) : (
        <>
          <Navbar handleClick={handleClick} currentPage={currentPage} />
          <main>
            {(currentPage === "games" && (
              <GameCardsGrid
                handleGameSelect={handleGameSelect}
                games={games}
              />
            )) ||
              (currentPage === "about" && <About />) ||
              (currentPage === "game" && <GameDetails game={selectedGame} />)}
          </main>
          {currentPage === "games" && (
            <Pagination
              itemsCount={gamesCount}
              pageSize={8}
              selectedPage={currGamesPage}
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
