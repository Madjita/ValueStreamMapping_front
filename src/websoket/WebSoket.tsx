import React from "react";

const  CreateWebSoket = () => {};

export default CreateWebSoket

/*
export  default CreateWebSoket = (URL: String,socket: any,reconect: boolean,callBackResult: (event: any) => void, callBackReconect: (event: any) => void) => {

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
 
}*/



