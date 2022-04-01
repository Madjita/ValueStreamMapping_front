import React,{useState,useEffect} from 'react'
import axios from 'axios'

const TestAnton=()=>{

    const GetFileJSON = async () => {
       
      /*  const response = await axios.get('http://'+serverApiHost+':5001/api/cardVSM/view')

        if(response.status != 200)
        {
          return ;
        }

       // let content = response.data as AllCards;

        console.log("LOADING = ",content)
        */
    }


    useEffect(() => {
        GetFileJSON();
    },[])

  
    return (
        <div>

        </div>
    )
}