import { useState } from "react";
import NewVehicleForm from "./NewVehicleForm";
import RegisteredVehicleForm from "./RegisteredVehicleForm";

export default function Vehicle({ setVehicleData, tcKimlikNo }) {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (vehicleType) => {
    setActiveButton(vehicleType);
  };

  return (
    <div className="vehicle-component">
      <h2>Araç Bilgileri</h2>
      <div className="btn-wrapper">
        <button
          className="btn"
          onClick={() => handleButtonClick("registeredVehicle")}
        >
          Kayıtlı Araç
        </button>
        <button
          className="btn btn-add"
          onClick={() => handleButtonClick("newVehicle")}
        >
          Yeni Araç
        </button>
      </div>
      {activeButton === "registeredVehicle" && (
        <RegisteredVehicleForm
          tcKimlikNo={tcKimlikNo}
          setVehicleData={setVehicleData}
        />
      )}
      {activeButton === "newVehicle" && (
        <NewVehicleForm
          setVehicleData={setVehicleData}
          tcKimlikNo={tcKimlikNo}
        />
      )}
    </div>
  );
}
