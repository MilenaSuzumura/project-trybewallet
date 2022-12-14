import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      Hello, TrybeWallet!
      <Route path="/" component={ Login } exact />
      <Route path="/carteira" component={ Wallet } />
    </div>
  );
}

export default App;
