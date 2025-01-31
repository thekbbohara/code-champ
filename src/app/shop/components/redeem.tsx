'use client';
interface RedeemItem {
  name: string;
  tokens: number;
  image: string;
  description: string;
}
const redeemableItems: RedeemItem[] = [
  {
    name: 'Premium Avatar Frame',
    tokens: 100,
    image: '/items/avatar-frame.png',
    description: 'Show off your status with this exclusive frame'
  },
  {
    name: 'Custom Room Background',
    tokens: 200,
    image: '/items/background.png',
    description: 'Personalize your coding room appearance'
  },
  {
    name: 'Special Effects Bundle',
    tokens: 300,
    image: '/items/effects.png',
    description: 'Add flair to your victories with unique animations'
  }
];

const RedeemItem = ({ item }: { item: RedeemItem }) => {
  return (
    <div key={item.name} className="bg-transparent border border-gray-600 rounded-lg p-6">
      <div className="w-full h-48 bg-gray-700 rounded-lg mb-4">
        {/* Add actual images here */}
      </div>
      <h3 className="text-xl font-bold text-gray-200 mb-2">{item.name}</h3>
      <p className="text-gray-400 mb-4">{item.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-orange-500 font-bold">{item.tokens} Tokens</span>
        <button className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-100">
          Redeem
        </button>
      </div>
    </div>
  );
};

export const RedeemComponent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {redeemableItems.map((item, id) => (
        <RedeemItem key={id} item={item} />
      ))}
    </div>
  );
};



