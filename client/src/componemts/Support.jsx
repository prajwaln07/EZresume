import React from 'react';
import Chatbot from './ChatbotWithChat';

const SupportPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-blue-600 text-white"
      style={{
        minHeight: 'calc(100vh - 60px)', // Adjust for navbar height
        width: '100%',
      }}
    >

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
};

export default SupportPage;
