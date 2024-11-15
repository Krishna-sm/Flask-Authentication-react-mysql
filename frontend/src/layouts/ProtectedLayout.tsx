import React, { useEffect } from 'react'
import { useMainContext } from '../context/MainContext' 
import { useNavigate } from 'react-router-dom'

const ProtectedLayout = ({children}:{children:React.ReactNode}) => {
 
  const navigate = useNavigate();
  const { user ,loading} = useMainContext();
  
  useEffect(() => {
    // If the user does not have an email, navigate to login page
    if ( !loading && !user.email  ) {
      navigate("/login");
    } 
  }, [user]);
    
    if(loading){
        return <div>loading....</div>
    }

  return (
    <>{children}</>
  )
}

export default ProtectedLayout