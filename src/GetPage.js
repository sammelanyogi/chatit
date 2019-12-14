import React, {
  useState
} from 'react'
import {
  Link
} from 'react-router-dom';

import './App.css';

function GetPage(props) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [prop] = useState(props)


  function handleSubmit() {
    if (/\S/.test(username)) {
      prop.callback({ username, room })
    }
    else {
      document.getElementById("error").innerHTML = "Please set a username."
    }

  }

  function handleUser() {
    var nami = document.getElementById('uname').value;
    setUsername(nami);
  }

  function handleRoom() {
    var roomi = document.getElementById('room').value;
    setRoom(roomi);
  }
  return (
    <div className="App" >
      <header className="App-header" >
        Chatit!
      </header>


      <form className="mainform" onSubmit={() => handleSubmit()} >
        <div id="error"></div>
        <div className='initin' >
          <label >
            <h3 > username: < br /> </h3>
            <input id="uname" type="text" placeholder="enter a username" value={username} onChange={() => handleUser()} />
          </label>

        </div>
        <div className='initin' >
          <label >
            <h3 > chatroom: < br /> </h3>
            <input id='room' type="text" placeholder="pick a room" value={room} onChange={() => handleRoom()} />
          </label>
        </div>

        <Link to={'/chatit/' + room} > < input className="button" type="submit" value="Go." onClick={() => handleSubmit()} /></Link >

      </form>

    </div>

  );
}
export default GetPage;