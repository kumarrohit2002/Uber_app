import { useRef, useState } from "react";
import {useGSAP} from '@gsap/react';
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConformRide from "../components/ConformRide";

const Home = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef=useRef(null);
  const panelCloseRef=useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const vehiclePanelRef=useRef(null);
  const [conformRidePanel, setConformRidePanel] = useState(false);
  const conformRidePanelRef=useRef(null);

  const submitHandler =(e)=>{
    e.preventDefault();
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%',
        // opacity:1,
        padding:24
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%',
        // opacity:0,
        padding:0
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  },[panelOpen])
  
  useGSAP(function(){
    if(vehiclePanelOpen){
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[vehiclePanelOpen])
  useGSAP(function(){
    if(conformRidePanel){
      gsap.to(conformRidePanelRef.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(conformRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[conformRidePanel])

  return (
    <div>
      <div>
        <img className="w-16 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
      </div>
      <div className="h-screen w-screen">
        {/* temprori img */}
        <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] bg-white p-5 relative">
          <h5 ref={panelCloseRef} onClick={()=>{setPanelOpen(false)}} className="opacity-0 absolute right-6 top-6 text-2xl">
            <i className="ri-arrow-down-wide-fill"></i>
          </h5>
          <h4 className="text-2xl font-semibold">
            Find a Trip
          </h4>

          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
            <input onClick={()=>{setPanelOpen(true)}} value={pickup} onChange={e=>setPickup(e.target.value)} className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder="Add a pick-up location"/>
            <input onClick={()=>{setPanelOpen(true)}}  value={destination} onChange={e=>setDestination(e.target.value)} className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'  type="text" placeholder="Enter your destination"/>
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
        </div>
      </div>
      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <VehiclePanel setConformRidePanel={setConformRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>
      <div ref={conformRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <ConformRide setConformRidePanel={setConformRidePanel}/>
      </div>
    </div>
  )
}

export default Home;

