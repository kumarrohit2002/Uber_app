import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({})

  const submitHandler=(e)=>{
    e.preventDefault();
    setCaptainData({email:email,password:password});
    setEmail('');
    setPassword('');
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-16 ml-1 mb-4" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
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
          <p className="text-center">Join a fleet? <Link to="/captain-signup" className="text-blue-500">Register as a Captain</Link></p>
      </div>
      <div>
        <Link to="/login" className="flex items-center justify-center w-full py-3 mt-5 bg-[#d5622d] text-white font-semibold mb-7 rounded px-4 py-2 border text-lg">
            Sign in as User
          </Link>
      </div>
    </div>
  )
}

export default CaptainLogin