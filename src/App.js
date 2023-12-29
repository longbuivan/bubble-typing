import React, { useState, useEffect } from 'react';
import './App.css'; // CSS file to style the components

const BubbleApp = () => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let timeoutId;

    const keyDownHandler = (e) => {
      const typedChar = e.key;

      if (
        (e.keyCode === 8 || e.key === 'Backspace') && // Handling Backspace
        displayText.length > 0
      ) {
        setDisplayText(prevText => prevText.slice(0, -1));
      } else if (
        e.key !== 'Shift' &&
        e.key !== 'Enter' &&
        /^[a-zA-Z0-9 .,!@]+$/.test(typedChar)
      ) {
        setDisplayText(prevText => {
          const newText = prevText + typedChar;
          return newText.length > 20 ? wrapText(newText) : newText;
        });
      }

      if (e.key === 'Enter') {
        setDisplayText('');
      }

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDisplayText('');
      }, 2000); // Change the duration here for the bubble to disappear slowly
    };

    const wrapText = (text) => {
      let wrappedText = '';
      let remainingText = text;
      while (remainingText.length > 100) {
        let line = remainingText.substring(0, 100);
        const lastSpaceIndex = line.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
          line = line.substring(0, lastSpaceIndex);
        }
        wrappedText += line + '\n';
        remainingText = remainingText.substring(line.length).trim();
      }
      if (remainingText.length > 0) {
        wrappedText += remainingText;
      }
      return wrappedText;
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      clearTimeout(timeoutId);
    };
  }, [displayText]);

  return (
    <div className="app-container" onClick={() => setDisplayText('')}>
      <div className="bubble" style={{ display: displayText ? 'block' : 'none' }}>
        {displayText}
      </div>
    </div>
  );
};

export default BubbleApp;
