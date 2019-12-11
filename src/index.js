import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
const socket = require('socket.io-client').connect('http://makeit.fail:4000');

const appendMessage = (message) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message.name + " :: " + message.text;
    const iva = document.getElementById("messages");
    iva.append(messageElement)
    iva.scrollTop = iva.scrollHeight
}

socket.on('new-message', (messages) => {
    console.log('new message')
    if (document.getElementById("messages")) {
        appendMessage(messages)
    }
})
socket.on('typing', function (data) {
    if (document.getElementById("messages")) {
        if (data) document.getElementById('isTyping').innerHTML = data;
        else document.getElementById("isTyping").innerHTML = "";
    }

});

ReactDOM.render(
    <Router>
        <App socket={socket} />
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
