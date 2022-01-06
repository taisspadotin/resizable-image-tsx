import React from 'react';
import Resizable from "./Resizable/";

function App() {
  return (
    <div className="App">
      <Resizable
        top={100}
        left={100}
        width={300}
        height={200}
      >
        <div
          style={{
            background: '#ffffff',
            height: '100%',
            borderRadius: '4px',
            border: '1px solid #2c2c2c',
            boxShadow: '0px 0px 7px 5px rgba(0,0,0,0.2)'
          }}
        >
           <img
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '4px'
            }}
            src="https://vetplus.vet.br/wp-content/uploads/2019/12/meme-da-mulher-gritando-com-o-gato-na-mesa-og-1080x630.jpg"
          />
        </div>
      </Resizable>
    </div>
  );
}

export default App;
