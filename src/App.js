import React, {useState} from 'react';
import Wallet from './components/Wallet';
import SelectCollections from './components/SelectCollections';
import { useAddress }  from './hooks/useConnectedAddress';

function App() {
  const address = useAddress()
  const [sdollarsBalance, setSdollarsBalance] = useState(0);

  const pull_sdollarsBalance = (newBalance) => {
    setSdollarsBalance(newBalance);
  }

  return (
    <div className="container">
      <div className="header">
        <h1>
          <p></p>
          <p className="text-center">
            Lootopia!
          </p>
          <hr />
        </h1>
      </div>
      <div className="nes-container text-center is-centered with-title is-dark">
        <p className="title">Wallet Settings</p>
        <Wallet address={ address } recallSdollarsBalance={pull_sdollarsBalance}/>
      </div>
      <p></p>
      {address &&
          <SelectCollections sdollarsBalance={sdollarsBalance} recallSdollarsBalance={pull_sdollarsBalance}/>
      }       
    </div>
  );
}

export default App;
