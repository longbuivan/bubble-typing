import React, { useState, useEffect } from 'react';
import './App.css'; // CSS file to style the components

const BubbleApp = () => {
  const [messages, setMessages] = useState([]);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const handleKeyPress = (e) => {
      const typedChar = e.key;

      if (e.key === 'Enter') {
        if (displayText.trim() !== '') {
          const newMessage = { id: new Date().getTime(), text: displayText.trim() };
          if (messages.length >= 3) {
            const updatedMessages = messages.slice(1); // Remove oldest message if there are already 3
            setMessages([...updatedMessages, newMessage]);
          } else {
            setMessages(prevMessages => [...prevMessages, newMessage]);
          }
          setDisplayText('');
        }
      } else if (e.key === 'Backspace') {
        setDisplayText(prevText => prevText.slice(0, -1));
      } else if (e.key === 'Shift') {
        // Handle Shift key (optional)
      } else if (/^[a-zA-Z0-9\s,.?!@]+$/.test(typedChar) || (e.shiftKey && typedChar.length === 1)) {
        setDisplayText(prevText => {
          const newText = prevText + (e.shiftKey ? typedChar.toUpperCase() : typedChar);
          return newText.length > 85 ? newText.slice(0, 85) : newText;
        });
      }
    };

    const timeoutIds = messages.map((message, index) => {
      return setTimeout(() => {
        const updatedMessages = [...messages];
        updatedMessages.splice(index, 1);
        setMessages(updatedMessages);
      }, 1000);
    });

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [displayText, messages]);

  return (
    <div className="app-container" onClick={() => setDisplayText('')}>
      <div className="bubble">
        {messages.map((message) => (
          <div key={message.id} className="chat-bubble">
            {message.text}
          </div>
        ))}
        {displayText.trim() !== '' && (
          <div className="current-bubble">
            {displayText}
          </div>
        )}
      </div>
    </div>
  );
};

export default BubbleApp;
