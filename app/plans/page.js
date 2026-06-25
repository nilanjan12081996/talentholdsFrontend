'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans } from '../Reducer/PlanSlice';
import { Check } from 'lucide-react';

export default function PlansPage() {
  const dispatch = useDispatch();
  const { plans } = useSelector((state) => state.plan);

  useEffect(() => {
    dispatch(getPlans());
  }, [dispatch]);

  const handleBuyNow = (plan) => {
    // Razorpay integration will go here
    console.log('Open Razorpay for plan:', plan.name);
    // alert('Razorpay integration pending. Client will add later.');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] rounded-[20px] p-4 md:p-8 overflow-y-auto" style={{ background: 'var(--bg-card)' }}>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Pricing Plans</h1>
        <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Choose the right plan to power up your hiring process. Upgrade anytime as your team grows.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">
        {(plans?.data?.length > 0 ? plans.data : []).map((plan, index) => {
          const isActive = plan.name.toLowerCase() === 'team' || plan.name.toLowerCase() === 'pro';
          
          const features = [
            plan.planAccess?.maxJobApplicationLinks === -1 ? 'Unlimited Active Jobs' : `${plan.planAccess?.maxJobApplicationLinks} Active Jobs`,
            plan.planAccess?.maxHiringTeamMembers === -1 ? 'Unlimited Users' : `${plan.planAccess?.maxHiringTeamMembers} Users`,
            plan.planAccess?.candidateDashboard ? 'Candidate Dashboard' : null,
            plan.planAccess?.resumeStorageGb === -1 ? 'Unlimited Storage' : `${plan.planAccess?.resumeStorageGb}GB Resume Storage`,
            plan.planAccess?.maxEmails === -1 ? 'Unlimited Emails' : `${plan.planAccess?.maxEmails} Emails`,
            plan.planAccess?.chromeExtension ? 'Chrome Extension' : null
          ].filter(Boolean);

          return (
            <div key={plan.id || index} className={`relative rounded-2xl p-6 border ${isActive ? 'border-[#8645FF] shadow-xl scale-105 z-10 bg-[#181059]' : 'border-gray-200 bg-white'} transition-transform flex flex-col`}>
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#761ED3] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}
              <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-[#ffffff]' : 'text-[#1E1E4B]'}`}>{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className={`text-4xl font-bold text-[#1E1E4B] ${isActive ? 'text-[#ffffff]' : 'text-[#1E1E4B]'}`}>${plan.price}</span>
                <span className={`text-gray-500 text-sm ${isActive ? 'text-[#ffffff]' : 'text-[#1E1E4B]'}`}>/{plan.billingCycle}</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1 mt-4">
                {features.map((feature, i) => (
                  <li key={i} className={`flex items-start gap-2 text-sm ${isActive ? 'text-[#ffffff]' : 'text-gray-600'}`}>
                    <Check className="w-5 h-5 mt-0.5 text-[#8624f0] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleBuyNow(plan)}
                className={`w-full py-3 rounded-lg font-bold transition-colors text-sm mt-auto cursor-pointer ${isActive ? 'text-white bg-[#761ED3] hover:bg-[#8e2dd1]' : 'text-[#761ED3] bg-purple-50 hover:bg-purple-100'}`}
              >
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
