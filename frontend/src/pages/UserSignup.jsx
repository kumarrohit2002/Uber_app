import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from '../context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const {user,setUser}=useContext(UserDataContext);

  const navigate=useNavigate();

  const submitHandler=async(e)=>{
    e.preventDefault();
    const newUser=({
      fullname:{
        firstname: firstName,
        lastname: lastName
      },
      email:email,
      password:password
    });

    try{
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);
      if(response.status===201){
        const data=response.data;
        setUser(data.user);
        localStorage.setItem('token',data.token);
        navigate('/home');
      }
    }catch(error){
      console.log(error.message);
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-16 ml-1 mb-4" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
        <form onSubmit={submitHandler}>
            <h3 className="text-xl font-medium mb-2">what's your name</h3>
          <div className="flex gap-4 mb-5">
            <input required
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="First name"
            />
            <input required
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Last name"
            />
          </div>
          <h3 className="text-xl font-medium mb-2">what's your email</h3>
          <input required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
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
            Signup
          </button>
        </form>
          <p className="text-center">Already have a account? <Link to="/login" className="text-blue-500">Login here</Link></p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          By processing, you consent to get calls, whatsapp or sms messages, including by automate means, from Uber and its 
          affiliates to the number provided.
        </p>
      </div>
    </div>
  )
}

export default UserSignup