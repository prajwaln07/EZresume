import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Function to handle sending the message to the chatbot API with retry logic for rate limit
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user's message to chat history (using the previous state to ensure correct update)
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { user: true, text: message },
    ]);

    try {
      const response = await sendRequestWithRetry(message);
      
      // Add chatbot's response to chat history after the user message
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { user: true, text: message },
        { user: false, text: response.data.reply },
      ]);
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
    }

    setMessage('');
  };

  // Retry function for handling rate limits (status 429)
  const sendRequestWithRetry = async (userMessage, retries = 3, delay = 1000) => {
    try {
      const response = await axios.post('http://localhost:5000/chatbot/chat', { message: userMessage });

      return response;  // Return the response if the request is successful
    } catch (error) {
      if (retries > 0 && error.response && error.response.status === 429) {
        console.log(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));  // Wait before retrying
        return sendRequestWithRetry(userMessage, retries - 1, delay);  // Retry the request
      } else {
        // If the error is not rate-limiting or retries are exhausted, throw it
        throw error;
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg mx-auto">
      <div className="h-80 overflow-y-auto space-y-4 mb-4">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${msg.user ? 'bg-teal-100 text-right' : 'bg-gray-100 text-left'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Ask anything about resumes..."
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-3 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
