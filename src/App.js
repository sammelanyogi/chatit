import React, {
  useState
} from 'react';
import {
  Switch,
  Route
} from 'react-router-dom'

import GetPage from './GetPage'
import ChatPage from './ChatPage'


function App(props) {

  const [username, setUsername] = useState();
  const [room, setRoom] = useState();
  const [prop] = useState(props);

  const getCredentials = (logindata) => {
    setUsername(logindata.username);
    setRoom(logindata.room);
  }

  return (
    <Switch>
      <Route path={'/' + room} >
        <ChatPage logindata={{ name: username, room }} socket={prop.socket} typers={prop.typers} />
      </Route>
      <Route path="/" >
        <GetPage callback={getCredentials} />
      </Route>

    </Switch>
  );
}

export default App;