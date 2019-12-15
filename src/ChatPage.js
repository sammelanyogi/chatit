import React, {
    useState, useEffect, useRef
} from 'react'
import './ChatPage.css'
import Message from './component/Message'



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
        prop.socket.emit("new-user", prop.logindata);
    }, [prop])
    useEffect(() => {
        prop.socket.on('datas', pre_data)
        prop.socket.on('new-user', new_user)
        prop.socket.on('disconnected', bye_user)
        prop.socket.on('new-message', new_message);
        prop.socket.on('typing', function (data) {
            if (document.getElementById("messages")) {
                if (data) document.getElementById('isTyping').innerHTML = data;
                else document.getElementById("isTyping").innerHTML = "";
            }

        });
        return () => {
            prop.socket.off('datas', pre_data)
            prop.socket.off('message');
            prop.socket.off('typing');
            prop.socket.off('new-user')
            prop.socket.off('disconnected')
        };
    }, [prop]);
    function pre_data(datas, name) {
        var newarray = []
        datas.forEach(x => { if (x !== name) { newarray.push({ new_user: true, name: x, text: "is in the room" }) } })
        setMsglist(msglist => msglist.concat(newarray))
    }
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
        prop.socket.emit('typing', { text: prop.logindata.name + " is typing..", room: prop.logindata.room });
        clearTimeout(timeout);
        timeout = setTimeout(() => { prop.socket.emit("typing", { text: false, room: prop.logindata.room }) }, 2000);
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
        prop.socket.emit('message', { mine: false, name: prop.logindata.name, room: prop.logindata.room, text: message });

    }

    return (
        <div className="mainpage" >
            <div className="App-header">
                <a href="https://makeit.fail/chatit">Chatit!</a>
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