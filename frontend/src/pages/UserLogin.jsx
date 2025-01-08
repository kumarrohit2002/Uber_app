import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {UserDataContext} from '../context/UserContext';
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const {user,setUser}=useContext(UserDataContext);

  const submitHandler=async(e)=>{
    e.preventDefault();
    const userData=({email:email,password:password});
    try{
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData);
      if(response.status===200){
        const data=response.data;
        setUser(data.user);
        localStorage.setItem('token',data.token);
        navigate('/home');
      }
    }catch(err){
      console.log(err.message);
    }
    setEmail('');
    setPassword('');
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-16 ml-1 mb-8" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
        <form onSubmit={submitHandler}>
          <h3 className="text-xl font-medium mb-2">what's your email</h3>
          <input required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-xl font-medium mb-2">Enter password</h3>
          <input required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-2  rounded px-4 py-2 border w-full text-lg">
            Login
          </button>
        </form>
          <p className="text-center">New here? <Link to="/signup" className="text-blue-500">Create new Account</Link></p>
      </div>
      <div>
        <Link to="/captain-login" className="flex items-center justify-center w-full py-3 mt-5 bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 border text-lg">
            Sign in as Captain
          </Link>
      </div>
    </div>
  )
}

export default UserLogin