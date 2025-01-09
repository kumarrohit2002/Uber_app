
const ConformRide = (props) => {
  return (
    <div>
        <h5 onClick={()=>props.setConformRidePanel(false)} className='p-3 text-center w-[93%] absolute top-0'><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>
        <h3 className="text-2xl font-semibold mb-5">Conform your Ride</h3>
        <div className="flex gap-5 flex-col justify-between items-center">
            <img className="h-32" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="car" />
            <div className="w-full mt-5">
                <div className="flex items-centers gap-5 p-3 border-b-2">
                    <i className="text-lg ri-map-pin-2-full"></i>
                    <div>
                        <h3 className="text-lg font-medium">562/11-A</h3>
                        <p className="text-sm -mt-1 text-gray-600">Kankariya Tabab, Bhopal</p>
                    </div>
                </div>
                <div className="flex items-centers gap-5 p-3 border-b-2">
                    <i className="text-lg ri-map-pin-2-full"></i>
                    <div>
                        <h3 className="text-lg font-medium">Third wave coffee</h3>
                        <p className="text-sm -mt-1 text-gray-600">Kankariya Tabab, Bhopal</p>
                    </div>
                </div>
                <div className="flex items-centers gap-5 p-3">
                    <i className="text-lg ri-map-pin-2-full"></i>
                    <div>
                        <h3 className="text-lg font-medium">₹193.50</h3>
                        <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
                    </div>
                </div>
            </div>
            <button className="w-full bg-green-600 text-white font-semibold p-2">Conform</button>
        </div>

    </div>
  )
}

export default ConformRide