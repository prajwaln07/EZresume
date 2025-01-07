import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Chatbot = () => {
  useEffect(() => {
    // Create and append the chatbot config script
    const chatbotConfigScript = document.createElement('script');
    chatbotConfigScript.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "xx7V77yZ5LqdTwfmBAvv1",
        domain: "www.chatbase.co"
      }
    `;
    document.head.appendChild(chatbotConfigScript);

    const chatbotScript = document.createElement('script');
    chatbotScript.src = "https://www.chatbase.co/embed.min.js";
    chatbotScript.setAttribute('chatbotId', 'xx7V77yZ5LqdTwfmBAvv1');
    chatbotScript.setAttribute('domain', 'www.chatbase.co');
    chatbotScript.defer = true;
    document.body.appendChild(chatbotScript);

    // Cleanup the scripts and global variables on unmount
    return () => {
      if (chatbotConfigScript.parentNode) {
        document.head.removeChild(chatbotConfigScript);
      }
      if (chatbotScript.parentNode) {
        document.body.removeChild(chatbotScript);
      }
      if (window.embeddedChatbotConfig) {
        delete window.embeddedChatbotConfig;
      }
    };
  }, []); // Runs only once when the component mounts

  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white"
      style={{
        minHeight: 'calc(100vh - 60px)', // Adjust 60px to match your navbar height
        width: '100%',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to Your Smart Assistant</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Ask me anything! I'm here to guide and assist you with any queries.
        </p>
      </div>

      {/* Chatbot Section */}
      <div
        className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-lg text-gray-800 relative overflow-hidden"
        style={{ minHeight: '350px' }}
      >
        {/* Decorative Floating Elements */}
        <motion.div 
        initial={{x:-10,y:10}}
        animate={{x:0,y:0}}
        transition={{
          duration:5,
          repeat:Infinity,
          ease:"easeInOut",
          repeatType: 'reverse'
        }}
        
        className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-300 rounded-full opacity-30"></motion.div>
        <motion.div 

        initial={{x:30,y:30}}
        animate={{x:0,y:0}}
        transition={{
          duration:4,
          repeat:Infinity,
          repeatType:"reverse",
          ease:"easeInOut"
        }}

         className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-300 rounded-full opacity-30"></motion.div>

        {/* Chatbot Text */}
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Let's Chat!
        </h2>
        <p className="text-center text-gray-600">
          Your assistant is ready to help. Start a conversation now!
        </p>
      </div>
    </motion.div>
  );
};

export default Chatbot;
