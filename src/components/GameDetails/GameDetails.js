import './GameDetails.scss';
import PropTypes from 'prop-types';

import CommentsList from '../CommentsList/CommentsList';
import GameRating from '../GameRating/GameRating';
import { useEffect, useState } from 'react';
import HttpClient from '../../services/http';

const http = new HttpClient();

const GameDetails = ({ gameId }) => {
  const [game, setGame] = useState({});
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getGameDetails(gameId);
  }, []);

  useEffect(() => {
    getCommentsByGame();
    getUsers();
  }, []);

  async function getCommentsByGame() {
    const gameComments = await http.get(
      process.env.REACT_APP_GLITCH_BASE_URL + `/comments?gameId=${gameId}`
    );
    setComments(gameComments);
  }

  async function getUsers() {
    const allUsers = await http.get(
      process.env.REACT_APP_GLITCH_BASE_URL + '/users'
    );
    setUsers(allUsers);
  }

  async function getGameDetails(gameId) {
    const gameDetails = await http.get(
      process.env.REACT_APP_API_BASE_URL +
        `/games/${gameId}?key=663ba57cd49444e18a052cdc458cc5e6`
    );

    setGame(gameDetails);
  }

  return (
    <article className='game'>
      <img src={game.background_image} alt='' className='game__image' />
      <div className='game__info'>
        <h2 className='game__title'>{game.name}</h2>
        <span className='game_date'>{game.released}</span>
        <span className='game__rating'>
          <GameRating rating={game.rating} maxRating={5.0} />
        </span>
        <div>
          <h3>Platforms</h3>
          <p>{game.platforms?.map((p) => p.platform.name).join(', ')}</p>
        </div>
        <p className='game__description'>{game.description_raw}</p>
      </div>
      <CommentsList comments={comments} users={users} />
    </article>
  );
};

GameDetails.propTypes = {
  gameId: PropTypes.number.isRequired,
};

export default GameDetails;
