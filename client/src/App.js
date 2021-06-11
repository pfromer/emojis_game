import React from 'react';
import FirstUserStartPage from './components/Users/FirstUser/StartPage'
import FirstUserWaitingPage from './components/Users/FirstUser/WaitingPage'
import SecondUserStartPage from './components/Users/SecondUser/StartPage'
import Table from './components/Table/table'

import { HashRouter, Route, Switch } from 'react-router-dom';

const App = () => (
  <React.Fragment>
    <HashRouter>
        <Switch>
        <Route path="/second_user/:room_number/:friend_name">
            <SecondUserStartPage />
          </Route>
          <Route path="/first_user/:room_number/:self_name">
            <FirstUserWaitingPage />
          </Route>
          <Route path="/table">
            <Table />
          </Route>
          <Route path="/">
            <FirstUserStartPage />
          </Route>
        </Switch>
      </HashRouter>
    
  </React.Fragment>
);

export default App;