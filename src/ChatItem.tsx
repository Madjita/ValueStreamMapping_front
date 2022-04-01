

import React, { useState, useEffect, useRef } from "react";
import IDataOrder from "./Component/Data/IDataOrder"

const URL = 'ws://192.168.0.2:5001/wsItem';

const ChatItem =() => {
	const [user, setUser] = useState('Tarzan');
  	const [message, setMessage] = useState([]);
  	const [messages, setMessages] = useState<IDataOrder[]>([]);

	  const socket = useRef(null)  as any;
	 

      const [isPaused, setPause] = useState(false);

	  const [reconnect, setRecconect] = useState(false);
  
      useEffect(() => {
		console.log("Set socket after = ", socket.current);
		if (!socket.current || reconnect === false) {
			console.log("Set socket = ", socket.current);
			socket.current = new WebSocket(URL) ;
			socket.current.onmessage = (e: any) => {
				if (isPaused) return;
				const message = JSON.parse(e.data) as IDataOrder;  
				console.log("e", message);
				console.log("e messages", messages);
				setMessages([message,...messages] as IDataOrder[]); //message, 
			};

			socket.current.onopen = () => {
				// on connecting, do nothing but log it to the console
				console.log('connected')
				socket.current.send(JSON.stringify({ id: '1'}));
			}

			

			socket.current.onerror = (e : any) => {
				console.log("eror", e.data);
			};

			socket.current.onclose = (e : any)=>{
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


	  console.log("rerender ITEM")
  
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
	          {messages.reverse().map((message: any, index) =>
			  {
				console.log("message = == ", message)
			  	return (
	            <li key={message.id}>
	              <b>{message.Name}</b>: <em>{message.TActual}</em>
	            </li>
				  )
				  }
	          )}
	        </ul>

	    </div>
  	)
}

export default ChatItem;