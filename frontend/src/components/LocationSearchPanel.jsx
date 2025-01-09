import 'remixicon/fonts/remixicon.css';

const LocationSearchPanel = (props) => {
  // Location for just a sample
  const locations = [
    "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
    "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
    "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
    "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
  ];

  return (
    <div>
      {locations.map((location, id) => (
        <div onClick={()=>{
          props.setVehiclePanelOpen(true); 
          props.setPanelOpen(false);}} 
          key={id} className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start">
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-line"></i>
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
