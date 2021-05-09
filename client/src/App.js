import React from 'react';
import FirstUserStartPage from './components/FirstUserStartPage'
import FirstUserWaitingPage from './components/FirstUserWaitingPage'
import SecondUserStartPage from './components/SecondUserStartPage'
import Table from './components/Table/table'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => (
  <React.Fragment>
    <BrowserRouter>
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
      </BrowserRouter>
    
  </React.Fragment>
);

export default App;