
const VehiclePanel = (props) => {
  return (
    <div>
        <h5 onClick={()=>props.setVehiclePanelOpen(false)} className='p-3 text-center w-[93%] absolute top-0'><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>
          <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
          <div onClick={()=>props.setConformRidePanel(true)} onClick={()=>props.setConformRidePanel(true)} className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
            <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="car" />
            <div className="ml-2 w-1/2">
              <h4 className="font-medium text-base">UberGo <span><i className="ri-user-fill"></i>4</span> </h4>
              <h5 className="font-medium text-base">7 min away </h5>
              <p className="font-normal text-xs text-gray-600"> Affordable, compact rides</p>
            </div>
            <h2 className="text-lg font-semibold">₹193.50</h2>
          </div>
          <div className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
            <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="car" />
            <div className="ml-2 w-1/2">
              <h4 className="font-medium text-base">Moto <span><i className="ri-user-fill"></i>1</span> </h4>
              <h5 className="font-medium text-base">2 min away </h5>
              <p className="font-normal text-xs text-gray-600"> Affordable, compact rides</p>
            </div>
            <h2 className="text-lg font-semibold">₹65.00</h2>
          </div>
          <div onClick={()=>props.setConformRidePanel(true)} className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
            <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="car" />
            <div className="ml-2 w-1/2">
              <h4 className="font-medium text-base">Auto <span><i className="ri-user-fill"></i>3</span> </h4>
              <h5 className="font-medium text-base">5 min away </h5>
              <p className="font-normal text-xs text-gray-600"> Affordable, compact rides</p>
            </div>
            <h2 className="text-lg font-semibold">₹118.45</h2>
          </div>
    </div>
  )
}

export default VehiclePanel;