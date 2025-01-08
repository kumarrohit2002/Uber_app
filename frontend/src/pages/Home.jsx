const Home = () => {
  return (
    <div>
      <div>
        <img className="w-16 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
      </div>
      <div className="h-screen w-screen">
        {/* temprori img */}
        <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
      </div>
      <div className="bg-white h-screen absolute w-full p-5">
        <div className="h-[30%]">
          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          <form>
            <input className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' type="text" placeholder="Add a pick-up location"/>
            <input className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'  type="text" placeholder="Enter your destination"/>
          </form>
        </div>
        <div className="h-[70%] bg-red-700">

        </div>

      </div>
    </div>
  )
}

export default Home;

