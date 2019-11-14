import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import './App.css';
function GetPage(){
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
  
    function handleSubmit(event){
      alert('A name was submitted: '+ username);
      event.preventDefault();
    }
    function handleUser(){
      var nami= document.getElementById('uname').value;
      setUsername(nami);
      
    }
    function handleRoom(){
      var roomi = document.getElementById('room').value;
      setRoom(roomi);
    }
    return (
    <div className="App">
        <header className="App-header">
            Chatit!
        </header>

        <form className="mainform" onSubmit={()=>handleSubmit()}>
            <div  class='initin' >
            <label>
                <h3>username: <br/>
                <input  id="uname" type="text" placeholder="enter a username" value={username} onChange={()=>handleUser()} />
                </h3> 
            </label>

            </div>
            <div  class='initin' >
            <label>
                <h3>chatroom: <br/>
                <input id='room' type="text" placeholder="pick a room" value={room} onChange={()=>handleRoom()} />
                </h3>
            </label>
            </div>

            <Link to={'/'+room}><input className="button" type="submit" value="Go." /></Link>
            
        </form>

    </div>

    );
}
export default  GetPage;