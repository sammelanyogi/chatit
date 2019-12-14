import React, {
    useState, useEffect
} from 'react'
import './ChatPage.css'
import Message from './component/Message'
const socket = require('socket.io-client').connect('http://sammelanyogi.com.np:4000');


const ChatPage = (props) => {
    const [pin, setPin] = useState();
    const [message, setMessage] = useState();
    const [prop] = useState(props);
    const [msglist, setMsglist] = useState([]);
    useEffect(() => {
        document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight
    }, [msglist])
    useEffect(() => {
        socket.emit("new-user", prop.logindata.name);
    }, [prop])
    useEffect(() => {
        socket.on('new-user', new_user)
        socket.on('new-message', new_message);
        socket.on('typing', function (data) {
            if (document.getElementById("messages")) {
                if (data) document.getElementById('isTyping').innerHTML = data;
                else document.getElementById("isTyping").innerHTML = "";
            }

        });
        return () => {
            socket.off('message');
            socket.off('typing')
        };
    }, []);
    function new_user(data) {
        setMsglist(msglist => [...msglist, { new_user: true, name: data }])
    }
    function new_message(obj) {
        setMsglist(msglist => [...msglist, obj])
    }
    var timeout;
    const handleChange = () => {
        setMessage(document.getElementById('text').value)
        console.log('happening');
        socket.emit('typing', prop.logindata.name + " is typing..");
        clearTimeout(timeout);
        timeout = setTimeout(() => { socket.emit("typing", false) }, 2000);
    }
    const switchPin = () => {
        if (pin) setPin(false)
        else setPin(true)
    }
    const sendMessage = ev => {
        ev.preventDefault();
        document.getElementById('text').value = '';
        new_message({ mine: true, name: "me", text: message })
        switchPin();
        socket.emit('message', { mine: false, name: prop.logindata.name, text: message });

    }

    return (
        <div className="mainpage" >
            <div className="App-header">
                Chatit!
            </div>
            <div className="down" >
                <div id="messages" >
                    {msglist.map((item, i) => {
                        return <Message data={item} key={i} />
                    })}
                    <div id="msgalert">new message</div>
                </div>
                <div className='inputarea' >
                    <div id="isTyping"></div>
                    <form onSubmit={sendMessage}>
                        <input id="text" placeholder='enter message here' type='text' autoComplete="off" onChange={handleChange} />
                        <input id="send" type='button' value="send" onClick={sendMessage} />

                    </form>

                </div>

            </div>

        </div>

    );
}
export default ChatPage;