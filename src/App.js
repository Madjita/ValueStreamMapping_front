import './App.css';
import React, { useState,useRef,useEffect,useCallback } from 'react';

import Header from './Component/Header/Header';
import LeftBar from './Component/LeftBar/LeftBar';
import Main from './Component/Main/Main';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';


import IDialogAddOrder from './Component/Data/Dialog/IDialogAddOrder'
import Chat from './Chat';



const App=()=>{


  const [newOrder,setOrder] = useState();

  const addOrder=(value)=>
  {
    console.log("NEW = ", value)
    setOrder(value)
  }

  /*
  const [isPaused, setIsPaused] = useState(false);
    const [data, setData] = useState(null); 
    const [status, setStatus] = useState("");
    const [socket, setSocket] = useState(new WebSocket("ws://192.168.0.2:5001/ws"));
    const ws = useRef(null)

    const [chatHistory, setChatHistory] = useState([]);
    const [isOnline, setIsOnline] = useState(false);
    const [messages, setMessages] = useState({
      messages: 'null'
    });

  



    const addMessages = (msg) => {
      //setTextValue((prev) => [...prev, msg]);
    };

    useEffect(() => {
        if (!isPaused) {
            ws.current = new WebSocket("ws://192.168.0.2:5001/ws"); // создаем ws соединение
          


            ws.current.onopen = () => setStatus("Соединение открыто");	// callback на ивент открытия соединения
            ws.current.onclose = () => setStatus("Соединение закрыто"); // callback на ивент закрытия соединения

            ws.current.onmessage = (message) => {
              const newMessage = `Message from WebSocket: ${message.data}`
              this.setMessages({
                messages: this.state.messages.concat([newMessage]) 
              })
            }

            setSocket(ws);
            //setTextValue('sadas')
            //gettingData();
           
        }
        return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
    }, [ws, isPaused]);



  
    const gettingData = useCallback(() => {
        if (!ws.current) return;

        ws.current.onmessage = e => {                //подписка на получение данных по вебсокету
            if (isPaused) return;
            console.log('da')
            const message = JSON.parse(e.data);

        
            setData(message);
        };
    }, [isPaused]);
*/
   



  return (
    <Box sx={{ display: 'flex',height: '100%', }}>
      {/*<Chat/>*/}
      
        <CssBaseline />
        <Header/>
        <LeftBar addOrder={addOrder}/>
       <Main newOrder={newOrder}/> 
    </Box>
  );
}

export default App;
