import React from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import MainView from './views/Main';
import PlayStream from './views/PlayStream';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<MainView />} />
      <Route exact path="/play/:slug" element={<PlayStream />} />
    </Routes>
  </Router>
);

export default App;
