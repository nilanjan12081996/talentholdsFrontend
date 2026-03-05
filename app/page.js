"use client";

import { Geist, Geist_Mono, DM_Sans, Poppins, Bricolage_Grotesque } from "next/font/google";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import bannerImg from "../assets/imagesource/banner_img.png";
import hiringImage from "../assets/imagesource/hiring_img.png";
import featureImage from "../assets/imagesource/feature_img.png";
import dashboardImg from "../assets/imagesource/dashboard_img.png";
import whyImg from "../assets/imagesource/why_img.png";
import hiringNew from "../assets/imagesource/hiring_new.png";

import scoutsIcon from "../assets/imagesource/scouts_icon.png";
import videoIcon from "../assets/imagesource/video_icon.png";
import linkIcon from "../assets/imagesource/link_icon.png";

import { IoIosArrowDroprightCircle } from "react-icons/io";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // choose what you need
  variable: "--font-poppins", // optional (for CSS variable use)
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you need
  variable: "--font-bricolage", // optional for Tailwind/CSS use
});


// Icons
const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const FeatureIcon = ({ color }) => (
  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
    <div className="w-5 h-5 bg-current opacity-50 rounded-full"></div>
  </div>
);


export default function Home() {

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { question: "How do I get started with TalentHold?", answer: "You can sign up for a free account and start exploring our features immediately. No credit card required." },
    { question: "What is your refund policy?", answer: "We offer a 30-day money-back guarantee for all paid plans if you are not satisfied." },
    { question: "Can I cancel my subscription at any time?", answer: "Yes, you can cancel your subscription at any time from your account settings." },
    { question: "How does the free trial work?", answer: "You get 14 days of full access to our Pro features. After that, you can choose a plan or continue with the Free version." },
  ];

  const pricingPlans = [
    { name: "Free", price: "$0", period: "/month", features: ["5 Active Jobs", "1 user", "Email Support", "Basic Analytics"], buttonColor: "text-[#761ED3] bg-purple-50 hover:bg-purple-100", active: false },
    { name: "Basic", price: "$19", period: "/month", features: ["15 Active Jobs", "3 users", "Priority Support", "Advanced Analytics"], buttonColor: "text-[#761ED3] bg-purple-50 hover:bg-purple-100", active: false },
    { name: "Pro", price: "$49", period: "/month", features: ["50 Active Jobs", "10 users", "24/7 Support", "Custom Reports", "API Access"], buttonColor: "text-white bg-[#761ED3] hover:bg-[#8e2dd1]", active: true },
    { name: "Enterprise", price: "$99", period: "/month", features: ["Unlimited Jobs", "Unlimited users", "Dedicated Account Manager", "SSO & Audit Logs"], buttonColor: "text-[#761ED3] bg-purple-50 hover:bg-purple-100", active: false },
  ];

  return (
    <div className={`${poppins.variable} ${bricolage.variable} bg-white font-sans text-gray-900`}>

      {/* Hero Section */}
      <section className="pt-24 pb-0 lg:pt-32 lg:pb-0 overflow-hidden relative header_area">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 relative z-10">
          <div className="lg:flex items-center gap-0">
            <div className="lg:w-1/2 mb-10 lg:mb-26">
              <h1 className={`${bricolage.variable} text-3xl leading-[40px] lg:text-6xl lg:leading-[64px] font-extrabold lg:mb-6 mb-4 text-[#1E1E4B]`}>
                Hire Faster.<br />
                Stay Organized.<br />
                <span className="text-[#FA4F58]">No Complex Setup.</span>
              </h1>
              <p className="text-[#363636] text-base font-medium mb-4 max-w-lg leading-relaxed">
                TalentHold is a modern hiring workspace where you can collect applications, review candidates, , manage referrals and move them through stages — all in one clean dashboard.
              </p>
              <p className="text-[#363636] text-base font-semibold mb-8 max-w-lg leading-relaxed">
                No career page needed. No complex ATS needed. Just share a link and start hiring.
              </p>

              <div className="flex gap-4">
                <button className="bg-[#761ED3] text-white px-8 py-3.5 rounded-lg font-medium hover:bg-[#8e2dd1] cursor-pointer transition-colors shadow-lg shadow-purple-200 flex items-center gap-2">
                  Get Started Now <IoIosArrowDroprightCircle className="text-[#FB4D18] text-2xl" />
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              {/* Abstract Shapes Background */}
              <Image src={bannerImg} alt='bannerImg' className="" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Intro Section */}
      <section className="bg-[#140626] py-16 text-white relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10 lg:gap-20 relative z-10 lg:h-[300px]">
          <div className="lg:w-6/12 relative">
            <Image src={hiringImage} alt='hiringImage' className="lg:absolute top-0 left-0 lg:mt-[-270px] z-[100px]" />
          </div>
          <div className="max-w-xl">
            <h2 className="lg:text-[40px] lg:leading-[48px] text-2xl text-[#FFFFFF] font-bold mb-6">One Hiring Dashboard.<br />Everything in One Place.</h2>
            <p className="text-[#B5ACBD] text-[17px] leading-[28px]">
              <strong className="text-white">TalentHold</strong> brings applicants, referrals, resumes, video introductions, notes, feedback, and hiring stages together in one simple hiring flow. <strong className="text-[#FFFFFF] block">No tool switching. No manual tracking.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-10 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="lg:text-[40px] lg:leading-[48px] text-2xl font-bold text-[#1E1E4B] mb-12">Features that amazed<br />our visitors</h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1 w-[70px] h-[70px] rounded-[100%] bg-white shadow-xl p-4 flex items-center justify-center">
                    <Image src={scoutsIcon} alt='scoutsIcon' className="" />
                  </div>
                  <div className="w-11/12">
                    <h3 className="font-bold text-[18px] lg:text-[25px] text-[#1E1E4B] mb-2">Turn Your Employees Into Talent Scouts</h3>
                    <p className="text-base text-[#3F3F3F] font-medium pb-1">Track Employee Referrals Properly</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Track Employee Referrals ProperlyShare a referral link internally and let employees submit candidates with resumes, 
                      notes, and optional intro videos. Track referrals, hiring progress, and rewards in one place.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-[70px] h-[70px] rounded-[100%] bg-white shadow-xl p-4 flex items-center justify-center">
                    <Image src={videoIcon} alt='videoIcon' className="w-9/12" />
                  </div>
                  <div className="w-11/12">
                    <h3 className="font-bold text-[18px] lg:text-[25px] text-[#1E1E4B] mb-2" >Video Introduction</h3>
                    <p className="text-base text-[#3F3F3F] font-medium pb-1">See the Candidate Before the Interview</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      See the Candidate Before the Interview Let candidates introduce themselves through short videos to 
                      screen communication, confidence, and clarity before interviews.
                    </p>
                  </div>
                </div>
                  <div className="flex gap-4">
                    <div className="mt-1 w-[70px] h-[70px] rounded-[100%] bg-white shadow-xl p-4 flex items-center justify-center">
                    <Image src={linkIcon} alt='linkIcon' className="w-9/12" />
                  </div>
                    <div className="w-11/12">
                      <h3 className="font-bold text-[18px] lg:text-[25px] text-[#1E1E4B] mb-2">One Link Hiring</h3>
                      <p className="text-base text-[#3F3F3F] font-medium pb-1">Just Share a Link. Start Receiving Applications.</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Just Share a Link. Start Receiving Applications. No career page or complex setup needed. Create a job, 
                        share the link anywhere, and all applications land directly in your dashboard—organized and ready to review.
                      </p>
                      <p className="text-base text-[#3F3F3F] font-medium pb-1">No resumes lost. No inbox overload.</p>
                    </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
                <Image src={featureImage} alt='featureImage' className="" /> 
            </div>
     </div>
  </div>
  </section>

  {/* Dashboard Preview */}
      <section className="py-10 lg:py-20 bg-white dashboard_area">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="lg:text-[40px] lg:leading-[48px] text-2xl font-bold text-[#1E1E4B] mb-8">Unified Hiring Dashboard</h2>
          <p className="text-[#3F3F3F] font-semibold text-[18px] mb-2 max-w-2xl mx-auto">Your entire pipeline, on one screen</p>
          <p className="text-gray-500 mb-12 max-w-4xl mx-auto">View applicants and referrals together with recruiter assignment, notes, resumes, and video introductions — all in one hiring pipeline.</p>
          <div className="max-w-5xl mx-auto">
            <Image src={dashboardImg} alt='dashboardImg' className="" />
          </div>
        </div>
      </section>
    
      {/* Why TalentHold */}
      <section className="py-10 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="bg-blue-50 rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
                  <Image src={whyImg} alt='whyImg' className="" />
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <h2 className="lg:text-[40px] lg:leading-[48px] text-2xl font-bold text-[#1E1E4B] mb-4">Why TalentHold</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                 Built for speed, not complexity, TalentHold helps you move from job post to first applicant in minutes. Share a single 
                 link anywhere and turn any post into a live hiring pipeline that keeps collecting talent without losing candidates between 
                 email and interview. With your entire pipeline on one screen, teams hiring 5 to 100 people a year can shortlist faster, 
                 schedule interviews quicker, and make hires with confidence—bringing organized hiring from day one.
              </p>
              <ul className="space-y-4">
                   {[
                     "Modern hiring tool built for startups",        
                      "No complex ATS setup" ,               
                      "Create job links in seconds",
                      "Collect structured applications (not emails)",
                      "Resume + video screening",
                      "Manage referrals without spreadsheets" ,               
                      "Clean, simple interface",
                      "Move candidates through stages clearly",
                      "Track all candidates in one place"
                    ]. map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700">
                        <div className="w-5 h-5 rounded-full bg-[#eedeff] text-[#8624f0] flex items-center justify-center text-xs">✓</div>
                        {item}
                      </li>
                    ))}
                </ul>
            </div>
          </div>
        </div> 
      </section>
        
      {/* FAQ Section */}
      <section className="py-10 lg:py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="lg:text-[40px] lg:leading-[48px] text-2xl font-bold text-[#1E1E4B] text-center mb-6">Frequently asked Questions</h2>
              <p className="text-gray-500 max-w-3xl mb-12 mx-auto text-center">
                 Yes. TalentHold lets you view applicants and employee referrals together, along with assigned recruiters, notes, resumes, 
                 and video introductions — all in one hiring pipeline.
              </p>
                
              <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                      <button
                      onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center p-5 text-left font-medium text-[#1E1E4B] hover:bg-gray-100 transition-colors"
                      >
                      {faq.question}
                      <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === index && (
                            <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                            {   faq.answer}
                            </div>
                      )}
                  </div>
                ))} 
              </div>
          </div>   
      </section>

      {/* CTA Section */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="lg:flex items-center py-10 px-4 make_hiring_wrap">
            <div className="lg:w-6/12 flex justify-center items-center">
              <Image src={hiringNew} alt='hiringNew' className="" />
            </div>
            <div className="lg:w-6/12">
              {/* Background Elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.png')] opacity-5"></div>

              <h2 className="lg:text-[40px] lg:leading-[48px] text-2xl font-bold text-[#1E1E4B] mb-4 relative z-10">Make Hiring Easy with<br />TalentHold.</h2>
              <p className="text-gray-600 max-w-lg mb-8 relative z-10">
                Stop managing hiring in emails and spreadsheets. Start hiring with structure and simplicity.
              </p>
              <button className="bg-[#761ED3] text-white cursor-pointer px-8 py-3.5 rounded-lg font-medium hover:bg-[#8e2dd1] transition-colors shadow-lg shadow-purple-200 relative z-10 flex items-center gap-2">
                Get Started Free <IoIosArrowDroprightCircle className="text-[#FB4D18] text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="lg:text-[40px] lg:leading-[48px] text-2xl font-bold text-[#1E1E4B] mb-4">Pricing Plans</h2>
            <p className="text-gray-500 max-w-3xl mb-12 mx-auto text-center">We have several powerful plans to showcase your business and get discovered as a creative entrepreneurs. Everything you need.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative rounded-2xl p-6 border ${plan.active ? 'border-[#8645FF] shadow-xl scale-105 z-10 bg-[#181059]' : 'border-gray-200 bg-white'} transition-transform`}>
                {plan.active && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#761ED3] text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className={`text-lg font-bold mb-2 ${plan.active ? 'text-[#ffffff]' : 'text-[#1E1E4B]'}`}>{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className={`text-3xl font-bold text-[#1E1E4B] ${plan.active ? 'text-[#ffffff]' : 'text-[#1E1E4B]'}`}>{plan.price}</span>
                  <span className={`text-gray-500 text-sm ${plan.active ? 'text-[#ffffff]' : 'text-[#1E1E4B]'}`}>{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-2 text-sm ${plan.active ? 'text-[#ffffff]' : 'text-gray-600'}`}>
                      <CheckIcon className="w-4 h-4 text-[#8624f0]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                { plan.active ? 
                <button className={`w-full py-2.5 rounded-lg font-medium transition-colors text-sm ${plan.buttonColor}`}>
                  Try 1 month
                </button>
                :
                <button className={`w-full py-2.5 rounded-lg font-medium transition-colors text-sm ${plan.buttonColor}`}>
                  Choose
                </button>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
