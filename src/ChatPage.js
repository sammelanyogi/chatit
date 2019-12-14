import React, {
    useState, useEffect, useRef
} from 'react'
import './ChatPage.css'
import Message from './component/Message'
const socket = require('socket.io-client').connect('https://server.makeit.fail:4000');
// const socket = require('socket.io-client').connect('http://192.168.1.79:4000');



const ChatPage = (props) => {
    const messagesEndRef = useRef(null)
    const [pin, setPin] = useState();
    const [message, setMessage] = useState();
    const [prop] = useState(props);
    const [msglist, setMsglist] = useState([]);
    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [msglist])
    useEffect(() => {
        socket.emit("new-user", prop.logindata);
    }, [prop])
    useEffect(() => {
        socket.on('new-user', new_user)
        socket.on('disconnected', bye_user)
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
        setMsglist(msglist => [...msglist, { new_user: true, name: data, text: " connected the chat" }])
    }
    function bye_user(data) {
        setMsglist(msglist => [...msglist, { new_user: true, name: data, text: " disconnected." }])
    }
    function new_message(obj) {
        setMsglist(msglist => [...msglist, obj])
    }
    var timeout;
    const handleChange = () => {
        setMessage(document.getElementById('text').value)
        console.log('happening');
        socket.emit('typing', { text: prop.logindata.name + " is typing..", room: prop.logindata.room });
        clearTimeout(timeout);
        timeout = setTimeout(() => { socket.emit("typing", { text: false, room: prop.logindata.room }) }, 2000);
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
        socket.emit('message', { mine: false, name: prop.logindata.name, room: prop.logindata.room, text: message });

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
                    <div ref={messagesEndRef}></div>
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