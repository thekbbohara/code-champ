"use client";

//import { useState } from 'react';
import { motion } from 'framer-motion';

const MysticTavern = () => {
  //const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = {
    dice: {
      name: "Dragon's Dice",
      description: "A game of chance with enchanted dice that glow with each roll.",
      minPlayers: 2,
      maxPlayers: 6
    },
    cards: {
      name: "Mystic Cards",
      description: "Play with cards that reveal animated creatures and spells.",
      minPlayers: 2,
      maxPlayers: 4
    },
    riddles: {
      name: "Riddle Exchange",
      description: "Share and solve magical riddles with other patrons.",
      minPlayers: 1,
      maxPlayers: 10
    }
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-300">
          The Mystic Tavern
        </h1>

        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 rounded-xl backdrop-blur-sm border border-white/10 mb-8">
          <p className="text-gray-300 text-center text-lg">
            Welcome to the Mystic Tavern, where magical games and enchanted beverages await.
            Pull up a chair and join the fun!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(games).map(([key, game]) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 
                         p-6 rounded-xl backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-3 text-purple-200">{game.name}</h2>
              <p className="text-gray-300 mb-4">{game.description}</p>
              <div className="text-sm text-gray-400">
                <p>Players: {game.minPlayers} - {game.maxPlayers}</p>
              </div>
              <button
                //onClick={() => setSelectedGame(key)}
                className="mt-4 w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 
                         rounded-lg transition-colors duration-200"
              >
                Join Game
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p>Currently in tavern: 15 patrons • Active games: 3 • Special brews available: 5</p>
        </div>
      </motion.div>
    </div>
  );
};

export default MysticTavern;
