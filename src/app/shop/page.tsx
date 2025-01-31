'use client';

import { useState } from 'react';
import { RedeemComponent } from './components/redeem';
import { UpgradePackages } from './components/upgradePkg';
import { BuyTokens } from './components/buyTokens';

const Store = () => {
  const [selectedTab, setSelectedTab] = useState('tokens');



  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-200 mb-8">Store</h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedTab('tokens')}
            className={`px-6 py-2 rounded-lg ${selectedTab === 'tokens'
              ? 'bg-orange-500 text-white'
              : 'bg-transparent text-gray-400 border border-gray-600'
              }`}
          >
            Buy Tokens
          </button>
          <button
            onClick={() => setSelectedTab('upgrade')}
            className={`px-6 py-2 rounded-lg ${selectedTab === 'upgrade'
              ? 'bg-orange-500 text-white'
              : 'bg-transparent text-gray-400 border border-gray-600'
              }`}
          >
            Upgrade Package
          </button>
          <button
            onClick={() => setSelectedTab('redeem')}
            className={`px-6 py-2 rounded-lg ${selectedTab === 'redeem'
              ? 'bg-orange-500 text-white'
              : 'bg-transparent text-gray-400 border border-gray-600'
              }`}
          >
            Redeem Items
          </button>

        </div>


        {selectedTab === 'tokens' ? (
          <BuyTokens />
        ) : (selectedTab === 'redeem' ? (
          <RedeemComponent />
        ) : (
          <UpgradePackages />
        ))}
      </div>
    </div>
  );
};

export default Store;


