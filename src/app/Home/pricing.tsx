const Pricing = () => {
  const pricingPlans = [
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
      price: 15,
      coins: '200 coins',
      features: [
        'Advanced analytics',
        'Priority matching',
        'Chat with other pros',
      ],
      color: 'bg-transparent text-white border border-gray-600',
      popular: true,
    },

    {
      name: 'Big Boss',
      price: 25,
      coins: '500 coins',
      features: [
        'Everything in Pro',
        'Organize competitions',
        'Create custom challenges',
        'Room analytics',
      ],
      color: 'bg-transparent text-white border border-gray-600',
    },
  ];

  return (
    <section className="flex flex-col gap-6 justify-center items-center my-20" id="pricing">
      <div className="leading-8 mx-auto text-center flex flex-col gap-2">
        <h2 className="font-bold text-[48px] text-gray-200">Invest In Your Feature</h2>
        <p className=" text-gray-400 text-[24px] font-medium">Choose The plan that matches your interview preparation goals.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`w-full max-w-sm p-8 rounded-lg shadow-lg ${plan.color} ${plan.popular ? 'relative border-orange-400' : ''}`}
          >
            {plan.popular && (
              <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-3 py-1 text-sm font-semibold rounded-full">Popular</span>
            )}
            <h3 className="text-2xl font-bold mb-4 text-center">{plan.name}</h3>
            <p className="text-3xl font-bold mb-6 text-center">{plan.coins}</p>
            <ul className="space-y-4 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-lg">
                  <span className="text-green-400">&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3 px-6 text-lg font-semibold bg-white text-gray-800 rounded hover:bg-gray-100"
            >
              {`Purchase ${plan.price}$`}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
export default Pricing;
