import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectWrapper = ({children}) => {
    const token=localStorage.getItem('token');
    const navigate=useNavigate();
    const {captain,setCaptain}=useContext(CaptainDataContext);
    const [isLoding,setIsLoding]=useState(true);

    useEffect(()=>{
      if(!token){
        navigate('/captain-login');
    }
    },[token]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{headers:{Authorization:`Bearer ${token}`}}).then((response)=>{
        if(response.status==200){
            const data=response.data;
            setCaptain(data.captain);
            setIsLoding(false);
        }
    }).catch(error=>{
        console.log(error);
        localStorage.removeItem('token')
        navigate('/captain-login')
    })  


    if(isLoding){
        return(
            <div>
                Loading ......
            </div>
        )
    }

  return (
    <div>
        {children}
    </div>
  )
}

export default CaptainProtectWrapper