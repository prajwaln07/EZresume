import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const FAQPage = () => {
  const isDarkmode = useSelector((state) => state.theme.isDarkmode);
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is EZResume?',
      answer: 'EZResume is a user-friendly platform to create, customize, and download professional resumes effortlessly.',
    },
    {
      question: 'How do I create a resume?',
      answer: 'Simply choose a template, customize your details, and download the resume in just a few clicks.',
    },
    {
      question: 'Can I use EZResume for free?',
      answer: 'Yes, EZResume offers free templates and basic features for all users.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact our support team through the “Contact Us” page for any assistance or queries.',
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className={`min-h-screen py-12 px-6 ${
        isDarkmode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border ${
                isDarkmode ? 'border-gray-700' : 'border-gray-300'
              } rounded-lg`}
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left p-4 flex justify-between items-center"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <span>{activeIndex === index ? '-' : '+'}</span>
              </button>
              {activeIndex === index && (
                <div className="p-4 text-sm">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
