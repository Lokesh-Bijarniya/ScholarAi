import React from 'react';  

const PlanCard = ({ plan, isSelected }) => {  
  const features = [  
    { title: 'Course Generate', status: plan.courseGenerate },  
    { title: 'Flashcard & Quiz', status: plan.flashcardQuiz },  
    { title: 'Email support', status: plan.emailSupport },  
    { title: 'Help center access', status: plan.helpCenterAccess },  
  ];  

  return (  
    <div className={`relative bg-white p-8 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-2 ${isSelected ? 'shadow-3xl' : ''} ${plan.comingSoon ? 'bg-gray-50' : ''}`}>  
      {plan.comingSoon && (  
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black/10 rounded-2xl border-2 border-dashed border-gray-300">  
          <div className="absolute top-4 right-4">  
            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">  
              Coming Soon  
            </span>  
          </div>  
          <div className="absolute bottom-8">  
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300">  
              Notify Me  
            </button>  
          </div>  
        </div>  
      )}  
      <div className={`relative z-10 ${plan.comingSoon ? 'opacity-50' : ''}`}>  
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{plan.title}</h2>  
        <p className="text-3xl font-bold text-gray-900 mb-6">${plan.price}/month</p>  
        {!plan.comingSoon && (  
          <div className="mb-8">  
            <p className="text-lg font-medium text-gray-600 border-t pt-2">  
              {typeof plan.courseGenerate === 'number'   
                ? `${plan.courseGenerate} course generations`  
                : 'Unlimited course generations'}  
            </p>  
            <p className="text-lg font-medium text-gray-600 mt-2">  
              {typeof plan.flashcardQuiz === 'number'   
                ? `${plan.flashcardQuiz} flashcards & quizzes`  
                : 'Unlimited flashcards & quizzes'}  
            </p>  
          </div>  
        )}  
        {!plan.comingSoon && (  
          <ul className="space-y-4 mb-8">  
            {features.map((feature, index) => (  
              <li key={index} className="flex items-center justify-between">  
                <span className="text-gray-600 font-medium">  
                  {feature.title}  
                </span>  
                {feature.status ? (  
                  <span className="text-green-500 font-medium">✔</span>  
                ) : (  
                  <span className="text-gray-400 font-medium">×</span>  
                )}  
              </li>  
            ))}  
          </ul>  
        )}  
      </div>  
      <button  
        className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${  
          plan.comingSoon   
            ? 'bg-gray-200 text-gray-400 hover:bg-gray-300 cursor-not-allowed'   
            : 'bg-blue-600 text-white hover:bg-blue-700'  
        }`}  
        disabled={plan.comingSoon}  
      >  
        {plan.comingSoon ? (  
          <div className="flex flex-col items-center">  
            <span className="font-medium">Coming Soon</span>  
            <span className="text-sm text-gray-500">Launching soon!</span>  
          </div>  
        ) : (  
          isSelected ? 'Current Plan' : 'Get Started'  
        )}  
      </button>  
    </div>  
  );  
};  

const PricingPage = () => {  
  const plans = [  
    {  
      title: 'Free',  
      price: 0,  
      courseGenerate: 5,  
      flashcardQuiz: 5,  
      emailSupport: true,  
      helpCenterAccess: true,  
    },  
    {  
      title: 'Monthly',  
      price: 9.99,  
      courseGenerate: 'Unlimited',  
      flashcardQuiz: 'Unlimited',  
      emailSupport: true,  
      helpCenterAccess: true,  
      comingSoon: true,  
    },  
  ];  

  return (  
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">  
      <div className="container mx-auto px-4 py-4">  
        <h1 className="text-3xl font-bold text-gray-800">Plans</h1>  
        <p className=" text-gray-600 mb-8">  
          Choose the plan that fits your needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">  
          {plans.map((plan, index) => (  
            <PlanCard   
              key={index}  
              plan={plan}  
              isSelected={index === 0}  
            />  
          ))}  
        </div>  
      </div>  
    </div>  
  );  
};  

export default PricingPage;  