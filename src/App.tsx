import React from 'react';
import logo from './logo.svg';
import './App.css';
import Element from "./Element/";

function App() {
  return (
    <div className="App" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px'}}>
      <Element>
        <div style={{background: 'red', height: '100%'}}>
          <div style={{padding: 10}}>teste</div>
        </div>
      </Element>
    </div>
  );
}

export default App;
