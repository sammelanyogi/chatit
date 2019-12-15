import React, {
  useState
} from 'react';
import {
  Switch,
  Route
} from 'react-router-dom'

import GetPage from './GetPage'
import ChatPage from './ChatPage'
// const socket = require('socket.io-client').connect('http://192.168.1.79:4000');
const socket = require('socket.io-client').connect('https://server.makeit.fail:4000');


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
      <Route path={'/chatit/' + room} >
        <ChatPage logindata={{ name: username, room }} socket={socket} typers={prop.typers} />
      </Route>
      <Route path="/chatit/" >
        <GetPage callback={getCredentials} socket={socket} />
      </Route>

    </Switch>
  );
}

export default App;