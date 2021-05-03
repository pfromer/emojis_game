import React from 'react';
import FirstUserStartPage from './components/FirstUserStartPage'
import FirstUserWaitingPage from './components/FirstUserWaitingPage'
import SecondUserStartPage from './components/SecondUserStartPage'
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
          <Route path="/">
            <FirstUserStartPage />
          </Route>
        </Switch>
      </BrowserRouter>
    
  </React.Fragment>
);

export default App;