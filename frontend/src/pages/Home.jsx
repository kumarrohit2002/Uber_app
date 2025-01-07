import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1674395364266-76316bbc82fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRyYWZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] pt-8 h-screen flex flex-col justify-between w-full">
        <img className="w-16 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-[30px] font-bold">Get Started with Uber</h2>
          <Link to='/login' className="flex items-center justify-center w-full bg-black text-white font-semibold py-3 rounded mt-5">Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home;

