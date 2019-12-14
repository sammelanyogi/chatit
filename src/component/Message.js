import React, { useState } from 'react';
import './Message.css'
export default function Message(props) {
    const [prop] = useState(props)
    if (prop.data.new_user) {
        return (<div className="message" id="new_user">{prop.data.name} connected the chat</div>)
    }
    else
        if (prop.data.mine) {
            return (
                <div className="allmsg" id="mymessage">
                    <div className="message" id="mine">
                        <div id="texts">{prop.data.text}</div>
                    </div>
                </div>
            );
        }
        else return (
            <div className="allmsg" id="othersmessage">
                <div className="message" id="his">
                    <div id="names">{prop.data.name}</div>
                    <div id="texts">{prop.data.text}</div>
                </div>
            </div>
        );

}