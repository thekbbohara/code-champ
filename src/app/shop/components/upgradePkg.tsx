
'use client';

import { pricingPlans } from "@/app/Home/pricing";


export const UpgradePackages = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {pricingPlans.map((pkg, index) => (
        <div key={index} className="bg-transparent border border-gray-600 rounded-lg p-6 flex flex-col h-full gap-2">
          <h3 className="text-xl font-bold text-gray-200 mb-2">{pkg.name}</h3>
          <p className="text-gray-400 mb-4">{pkg.tokens} Tokens</p>

          <ul className="flex-grow">
            {pkg.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-lg">
                <span className="text-green-400">&#10003;</span>
                {feature}
              </li>
            ))}
          </ul>

          <button className="w-full py-3 px-6 text-lg font-semibold bg-white text-gray-800 rounded hover:bg-gray-100 mt-auto">
            Purchase - ${pkg.price}
          </button>
        </div>
      ))}
    </div>

  )
}

