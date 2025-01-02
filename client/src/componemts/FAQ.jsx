import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const FAQPage = () => {
  const isDarkmode = useSelector((state) => state.theme.isDarkmode);
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What makes EZResume different from other resume builders?',
      answer: 'EZResume offers ATS-friendly resumes, is free to use, has an intuitive interface, and provides 24/7 chatbot support for any questions.',
    },
    {
      question: 'Is there a way to get instant help with resume-related questions?',
      answer: 'Yes, our 24/7 chatbot support is always available to help with any resume-related doubts.',
    },
    {
      question: 'Are my resumes secure on EZResume?',
      answer: 'EZResume does not store any resume data, ensuring your privacy and security.',
    },
    {
      question: 'Can I download my resume in different formats?',
      answer: 'Yes, you can preview your resume in real-time and make adjustments before downloading.',
    },
    {
      question: 'Do I need to sign up to create a resume on EZResume?',
      answer: 'No, you can create and download resumes without signing up.',
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
