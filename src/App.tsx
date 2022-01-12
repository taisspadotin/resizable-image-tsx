import React from 'react';
import "./style.css";
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
          <div style={{
              width: "100%",
              height: 40,
              background: "#2c2c2c",
              color: "#fff",
              display: 'flex',
              alignItems: 'center'
            }}>
            <div style={{width: "80%", marginLeft: 5}}>Tela de imagem</div>
            <div style={{width: "20%", display: "flex", justifyContent: 'flex-end'}}>
              <div style={{width: 15, height: 15, background: 'green', borderRadius: '50%', marginRight: 5}}/>
              <div style={{width: 15, height: 15, background: 'red', borderRadius: '50%', marginRight: 5}}/>
            </div>
          </div>
           <img
            style={{
              width: '100%',
              height: 'calc(100% - 40px)'
            }}
            src="https://vetplus.vet.br/wp-content/uploads/2019/12/meme-da-mulher-gritando-com-o-gato-na-mesa-og-1080x630.jpg"
          />
        </div>
      </Resizable>
    </div>
  );
}

export default App;
