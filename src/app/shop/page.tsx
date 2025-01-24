'use client';

import { useState } from 'react';

const Store = () => {
  const [selectedTab, setSelectedTab] = useState('tokens');

  const tokenPackages = [
    {
      coins: 10,
      price: 1,
      color: 'bg-transparent text-white border border-gray-600'
    },
    {
      coins: 50,
      price: 4.5,
      color: 'bg-transparent text-white border border-gray-600',
      popular: true
    },
    {
      coins: 100, 
      price: 8,
      color: 'bg-transparent text-white border border-gray-600'
    }
  ];
const upgradePackages = [
  {
    name: 'Starter',
    price: 5,
    coins: '50 coins',
    features: [
      'Basic performance analytics',
      'Global chat access',
    ],
    color: 'bg-transparent text-white border border-gray-600',
  },
  {
    name: 'Pro',
    price: 10,
    coins: '100 coins',
    features: [
      'Advanced performance analytics',
      'Private chat access',
    ],
  },
  {
    name: 'Big Boss',
    price: 20,
    coins: '200 coins',
    features: [
      'Enterprise-level performance analytics',
      'Customizable chat features',
    ],
  }
]       
  const redeemableItems = [
    {
      name: 'Premium Avatar Frame',
      cost: 100,
      image: '/items/avatar-frame.png',
      description: 'Show off your status with this exclusive frame'
    },
    {
      name: 'Custom Room Background',
      cost: 200,
      image: '/items/background.png', 
      description: 'Personalize your coding room appearance'
    },
    {
      name: 'Special Effects Bundle',
      cost: 300,
      image: '/items/effects.png',
      description: 'Add flair to your victories with unique animations'
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-200 mb-8">Store</h1>
        
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedTab('tokens')}
            className={`px-6 py-2 rounded-lg ${
              selectedTab === 'tokens' 
                ? 'bg-orange-500 text-white'
                : 'bg-transparent text-gray-400 border border-gray-600'
            }`}
          >
            Buy Tokens
          </button>
          <button
          onClick={() => setSelectedTab('upgrade')}
          className={`px-6 py-2 rounded-lg ${
            selectedTab === 'upgrade'
              ? 'bg-orange-500 text-white' 
              : 'bg-transparent text-gray-400 border border-gray-600'
          }`}
        >
          Upgrade Package
        </button>
          <button
            onClick={() => setSelectedTab('redeem')}
            className={`px-6 py-2 rounded-lg ${
              selectedTab === 'redeem'
                ? 'bg-orange-500 text-white'
                : 'bg-transparent text-gray-400 border border-gray-600'
            }`}
          >
            Redeem Items
          </button>

        </div>
        

        {selectedTab === 'tokens' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tokenPackages.map((pkg, index) => (
              <div
                key={index}
                className={`p-8 rounded-lg shadow-lg ${pkg.color} ${pkg.popular ? 'relative border-orange-400' : ''}`}
              >
                {pkg.popular && (
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-3 py-1 text-sm font-semibold rounded-full">
                    Best Value
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-4 text-center">{pkg.coins} Coins</h3>
                <p className="text-3xl font-bold mb-6 text-center">${pkg.price}</p>
                <button className="w-full py-3 px-6 text-lg font-semibold bg-white text-gray-800 rounded hover:bg-gray-100">
                  Purchase
                </button>
              </div>
            ))}
          </div>
        ) : (selectedTab === 'redeem' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {redeemableItems.map((item, index) => (
              <div key={index} className="bg-transparent border border-gray-600 rounded-lg p-6">
                <div className="w-full h-48 bg-gray-700 rounded-lg mb-4">
                  {/* Add actual images here */}
                </div>
                <h3 className="text-xl font-bold text-gray-200 mb-2">{item.name}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 font-bold">{item.cost} Coins</span>
                  <button className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-100">
                    Redeem
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upgradePackages.map((pkg, index) => (
              <div key={index} className="bg-transparent border border-gray-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-200 mb-2">{pkg.name}</h3>
                <p className="text-gray-400 mb-4">{pkg.coins}</p>
                <button className="w-full py-3 px-6 text-lg font-semibold bg-white text-gray-800 rounded hover:bg-gray-100">
                  Purchase
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
