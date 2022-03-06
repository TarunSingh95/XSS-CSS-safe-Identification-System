import React, { useState, useEffect} from 'react'
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import {Navigate} from 'react-router-dom'

export default function Users() {

  const axiosPrivate = useAxiosPrivate();
  const [welcomeMessage, setWelcomeMessage] = useState("");
  
  
  useEffect(async () => {

        try {
          const response = await axiosPrivate.get("/api/auth/welcome");
          if (response?.status === 200) {
              setWelcomeMessage(response.data.message)
          }
        } catch (error) {
          console.error(error.message);
        } 
    
    return () => {
      setWelcomeMessage("");
    }
  }, [])
  

  return (
      <div>
          {welcomeMessage ? welcomeMessage : "Hello"}
    </div>
  )
}
