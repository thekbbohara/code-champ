//"use client";
//
//import { useState } from 'react';
//import { motion } from 'framer-motion';
//import styles from './Hangout.module.css';
//
//const HangoutZone = () => {
//  const [currentActivity, setCurrentActivity] = useState('lounge');
//
//  const areas = {
//    lounge: {
//      name: "Warrior's Lounge",
//      description: "A cozy area with magical floating cushions and ethereal ambient music. Share stories of your battles or just relax.",
//      activities: ["Meditate", "Chat", "Play Board Games"]
//    },
//    garden: {
//      name: "Zen Garden",
//      description: "A peaceful garden with levitating rocks and glowing spirit flowers. Perfect for recharging your energy.",
//      activities: ["Water Plants", "Rock Balancing", "Spirit Walking"]
//    },
//    tavern: {
//      name: "The Mystic Tavern",
//      description: "A lively gathering spot serving magical beverages and hosting mini-games.",
//      activities: ["Dice Games", "Trading Stories", "Virtual Drinks"]
//    },
//    training: {
//      name: "Practice Grounds",
//      description: "A safe space to practice moves without the pressure of battle.",
//      activities: ["Shadow Boxing", "Technique Practice", "Strategy Planning"]
//    }
//  };
//
//  return (
//    <div className="hangout-container">
//      <motion.div 
//        initial={{ opacity: 0 }}
//        animate={{ opacity: 1 }}
//        className="hangout-wrapper"
//      >
//        <h1 className="text-3xl font-bold text-center mb-8">Welcome to the Hangout Zone</h1>
//
//        <div className="areas-grid grid grid-cols-1 md:grid-cols-2 gap-6">
//          {Object.entries(areas).map(([key, area]) => (
//            <motion.div
//              key={key}
//              whileHover={{ scale: 1.05 }}
//              className="area-card bg-gradient-to-br from-purple-900/40 to-blue-900/40 
//                         p-6 rounded-xl backdrop-blur-sm border border-white/10"
//            >
//              <h2 className="text-2xl font-semibold mb-3">{area.name}</h2>
//              <p className="text-gray-300 mb-4">{area.description}</p>
//
//              <div className="activities-list">
//                <h3 className="text-lg font-medium mb-2">Activities:</h3>
//                <ul className="list-disc list-inside">
//                  {area.activities.map((activity, index) => (
//                    <li key={index} className="text-gray-300 hover:text-white cursor-pointer">
//                      {activity}
//                    </li>
//                  ))}
//                </ul>
//              </div>
//
//              <button 
//                onClick={() => setCurrentActivity(key)}
//                className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 
//                         rounded-lg transition-colors duration-200"
//              >
//                Enter {area.name}
//              </button>
//            </motion.div>
//          ))}
//        </div>
//
//        <div className="mt-8 text-center">
//          <p className="text-gray-400">
//            Current players in hangout: 42 • Active conversations: 8 • Events today: 3
//          </p>
//        </div>
//      </motion.div>
//    </div>
//  );
//};
//
//export default HangoutZone;
