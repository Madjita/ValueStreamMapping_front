

import React, { useState, useEffect, useRef } from "react";
import ChatItem from "./ChatItem";

const URL = 'ws://192.168.0.2:5001/ws';

const Chat =() => {
	const [user, setUser] = useState('Tarzan');
  	const [message, setMessage] = useState([]);
  	const [messages, setMessages] = useState([]);
	//const [socket, setSocket] = useState<WebSocket>(null);

  	const submitMessage = (usr, msg) => {
  		const message = { user: usr, message: msg };
  		socket.current.send(JSON.stringify(message));
  		setMessages([message, ...messages]);
  	}

	  const socket = useRef(null);
	 


  /*	useEffect(() => {
	    soket.onopen = () => {
	      console.log('WebSocket Connected');
	    }

	    soket.onmessage = (e) => {
          console.log('Read');
	      const message = JSON.parse(e.data);
	      setMessages([message, ...messages]);
	    }

	    return () => {
            soket.onclose = () => {
	        console.log('WebSocket Disconnected');
	        setWs(new WebSocket(URL));
	      }
	    }
  	}, ); //[ws.onmessage, ws.onopen, ws.onclose, messages]
*/

      const [isPaused, setPause] = useState(false);

	  const [reconnect, setRecconect] = useState(false);
  
      useEffect(() => {
		console.log("Set socket after = ", socket.current);
		if (!socket.current || reconnect === false) {
			console.log("Set socket = ", socket.current);
			socket.current = new WebSocket(URL);
			socket.current.onmessage = (e) => {
				if (isPaused) return;
				const message = JSON.parse(e.data);
				console.log("e", message);
				setMessages([message, ...messages]);
			};

			socket.current.onerror = (e) => {
				console.log("eror", e.data);
			};

			socket.current.onclose = e=>{
				console.log("CONNECTION CLOSED", e.data);
				socket.current.close(1000, "");

				setRecconect(true);
			}
		}
		return () => {
		  if (socket.current) {
			socket.current.close(1000, "");
			
		  }
		};
	  }, [socket,reconnect]);


	  console.log("rerender")
  
	  /*
      useEffect(() => {
          if (!socket.current) return;
  
          socket.current.onmessage = e => {
              if (isPaused) return;
              const message = JSON.parse(e.data);
              console.log("e", message);
              setMessages([message, ...messages]);
          };
      }, [isPaused]);*/

	  if(reconnect)
	  {
		  return (
			<button onClick={() => setRecconect(!reconnect)}>
			 reconnect
			</button>
		  )
	  }

  	return (
	    <div>
	        <label htmlFor="user">
	          Name :
	          <input
	            type="text"
	            id="user"
	            placeholder="User"
	            value={user}
	            onChange={e => setUser(e.target.value)}
	          />
	        </label>

	        <ul>
	          {messages.reverse().map((message, index) =>
	            <li key={index}>
	              <b>{message.user}</b>: <em>{message.message}</em>
	            </li>
	          )}
	        </ul>

	        <form
	          action=""
	          onSubmit={e => {
	            e.preventDefault();
	            submitMessage(user, message);
	            setMessage([]);
	          }}
	        >
	          <input
	            type="text"
	            placeholder={'Type a message ...'}
	            value={message}
	            onChange={e => setMessage(e.target.value)}
	          />
	          <input type="submit" value={'Send'} />
	        </form>
            <button onClick={() => setPause(!isPaused)}>
                {isPaused ? "Resume" : "Pause"}
            </button>

			<p>ЧАТ ИТЕМ</p>
			  <ChatItem/>
			
	    </div>
  	)
}

export default Chat;