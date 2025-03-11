import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api')
        .then((response) => response.json())
        .then((data) => setMessage(data.message))
        .catch((error) => console.error('Error:', error));
  }, []);

  return (
      <div>
        <h1>{message}</h1>
      </div>
  );
}

export default App;