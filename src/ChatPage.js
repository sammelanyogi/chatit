import React, {
    useState
} from 'react'
import './ChatPage.css'

function ChatPage(props) {

    const [message, setMessage] = useState();
    const [prop] = useState(props);

    const appendMessage = (messagek) => {
        const messageElement = document.createElement('div')
        messageElement.innerText = messagek.name + " :: " + messagek.text;
        const iva = document.getElementById("messages");
        iva.append(messageElement)
        iva.scrollTop = iva.scrollHeight
    }
    const handleChange = () => {
        setMessage(document.getElementById('text').value)
        console.log('happening');
        prop.socket.emit('typing', prop.logindata.name + " is typing..");
        clearTimeout(timeout);
        timeout = setTimeout(timeoutFunction, 2000);
    }
    var timeout;

    function timeoutFunction() {
        prop.socket.emit("typing", false);
    }

    const sendMessage = ev => {
        ev.preventDefault();
        document.getElementById('text').value = '';
        console.log("eti mes")
        appendMessage({ name: "You", text: message })
        prop.socket.emit('message', { name: prop.logindata.name, text: message });

    }

    return (
        <div className="mainpage" >
            <div className="App-header">
                Chatit!

            </div>
            <div className="down" >
                <div id="messages" ></div>

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