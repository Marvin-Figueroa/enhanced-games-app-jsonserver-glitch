import "./GameDetails.scss";
import { useEffect, useState } from "react";

import CommentsList from "../CommentsList/CommentsList";
import GameRating from "../GameRating/GameRating";
import HttpClient from "../../services/http";

const http = new HttpClient("https://plume-gelatinous-asp.glitch.me");

const GameDetails = ({ game }) => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getCommentsByGame();
    getUsers();
  }, []);

  async function getCommentsByGame() {
    const gameComments = await http.get(`/games/${game.id}/comments`);
    setComments(gameComments);
  }

  async function getUsers() {
    const allUsers = await http.get("/users");
    setUsers(allUsers);
  }

  return (
    <article className="game">
      <img src={game.image} alt="" className="game__image" />
      <div className="game__info">
        <h2 className="game__title">{game.name}</h2>
        <span className="game_date">{game.released}</span>
        <span className="game__rating">
          <GameRating rating={game.rating} maxRating={5.0} />
        </span>
        <p className="game__description">{game.description}</p>
      </div>
      <CommentsList comments={comments} users={users} />
    </article>
  );
};

export default GameDetails;
