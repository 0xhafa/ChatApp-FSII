import React from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import ChatHistory from './components/History/History';
import ChatLog from './components/Log/Log';
import Navigation from './components/Navigation/Nav';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navigation/>
      <Route path="/" exact component={Join} exact/>
      <Route path="/chat" component={Chat} />
      <Route path="/history" component={ChatHistory} />
      <Route path="/Log" component={ChatLog} />
    </Router>
  );
}

export default App;
