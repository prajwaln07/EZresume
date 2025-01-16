import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
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

    // Cleanup on unmount
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
  }, []);

  return null; // No UI elements needed
};

export default Chatbot;
