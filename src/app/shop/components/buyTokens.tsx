'use client'
const tokenPackages = [
  {
    tokens: 6.9,
    color: 'bg-transparent text-white border border-gray-600'
  },
  {
    tokens: 69,
    color: 'bg-transparent text-white border border-gray-600',
    popular: true
  },
  {
    tokens: 138,
    color: 'bg-transparent text-white border border-gray-600'
  }
];

export const BuyTokens = () => {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        <h3 className="text-2xl font-bold mb-4 text-center">{pkg.tokens} Tokens</h3>
        <p className="text-3xl font-bold mb-6 text-center">${pkg.tokens * 0.5}</p>
        <button className="w-full py-3 px-6 text-lg font-semibold bg-white text-gray-800 rounded hover:bg-gray-100">
          Purchase
        </button>
      </div>
    ))}
  </div>

}
