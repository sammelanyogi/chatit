import React from 'react';
import { Switch, Route} from 'react-router-dom'

import GetPage from './GetPage'
import ChatPage from './ChatPage'



function App() {

  return (
    <div>
      <Switch>
        <Route path='/room'>
            <ChatPage />
        </Route>
        <Route path="/">
         <GetPage />
        </Route>

      </Switch>

    </div>
  );
}

export default App;
