import GameCard from "../GameCard/GameCard";
import "./GameCardsGrid.scss";

const GameCardsGrid = ({ games, handleGameSelect }) => {
  return (
    <section className="games-container">
      {games.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          name={game.name}
          rating={game.rating}
          image={game.image}
          handleGameSelect={handleGameSelect}
        />
      ))}
    </section>
  );
};

export default GameCardsGrid;
