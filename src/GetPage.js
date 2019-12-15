import React, {
  useState, useEffect
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
    console.log(room + " " + username)
    if (/\S/.test(username) && /\S/.test(room)) {
      if (username.indexOf(" ") === -1 && room.indexOf(" ") === -1) {
        prop.socket.emit('validation', { username, room })

      } else document.getElementById("error").innerHTML = "username or room cannot contain space."
    }
    else {
      document.getElementById("error").innerHTML = "Please set a username and chatroom"
    }

  }
  useEffect(() => {
    prop.socket.on('validation', data => {
      if (data) {
        prop.callback({ username, room })
      }
      else {
        document.getElementById("error").innerHTML = "username " + username + " already there in room " + room
      }
    })
    return () => {
      prop.socket.off('validation')
    };
  }, [username, room, prop]);

  function handleUser() {
    var nami = document.getElementById('uname').value;
    setUsername(nami.toLowerCase());
  }

  function handleRoom() {
    var roomi = document.getElementById('room').value;
    setRoom(roomi.toLowerCase());
  }
  return (
    <div className="App" >
      <header className="App-header" >
        <a href="https://makeit.fail/chatit">Chatit!</a>
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