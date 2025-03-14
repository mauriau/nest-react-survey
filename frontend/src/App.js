import React, { useState, useEffect } from 'react';
import './App.css';

async function getData (): Promise<any>{
    const response = await fetch('http://localhost:3000/api')
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    return json;
}

function App() {
  const data = getData()


  return (
      <div>
        <h1>{data.message}</h1>
      </div>
  );
}

export default App;