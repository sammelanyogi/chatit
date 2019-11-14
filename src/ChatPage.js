import React, {useState} from 'react'
import './ChatPage.css'

function ChatPage(){
    const [text='', setText] = useState();

  
    const sendMessage = ev => {
        var ms = document.getElementById('text').value;
        document.getElementById('text').value='';
        setText(text+ms);
        ev.preventDefault();
    }
    return (
        <div className="mainpage">
            <header className="App-header">
                Chatit!
            </header>
            <div className="down">
                <div className="messages">
                    {text}
                </div>
                <div className='inputarea'>
                    <form onSubmit={sendMessage}> 
                        <input id="text" placeholder='enter message here' type='text'/>
                        <input id="sub"  type='button' value="enter" onClick={sendMessage}  />

                    </form>

                </div>

            </div>

        </div>

    );
}
export default  ChatPage;