// RegisteredVehicleForm.jsx
import React, { useState, useEffect } from "react";

export default function RegisteredVehicleForm({ tcKimlikNo }) {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    // Fetch the list of registered vehicles for the user
    const fetchVehicles = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/customers/${tcKimlikNo}/vehicles`
        );
        const data = await response.json();

        if (response.ok) {
          setVehicles(data.vehicles);
        } else {
          console.error("Error fetching vehicles:", data.error);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error.message);
      }
    };

    fetchVehicles();
  }, [tcKimlikNo]);

  const handleVehicleSelect = async (selectedPlaka) => {
    try {
      // Find the selected vehicle in the list
      const selectedVehicle = vehicles.find(
        (vehicle) => vehicle.plaka === selectedPlaka
      );

      if (!selectedVehicle) {
        console.error("Selected vehicle not found");
        return;
      }

      setSelectedVehicle(selectedVehicle);
    } catch (error) {
      console.error("Error selecting vehicle:", error.message);
    }
  };

  return (
    <div className="vehicle-form">
      <h3>Kayıtlı Araçlar</h3>
      <select
        className="input"
        onChange={(e) => handleVehicleSelect(e.target.value)}
      >
        <option value="">Select a vehicle</option>
        {vehicles.map((vehicle) => (
          <option key={vehicle.plaka} value={vehicle.plaka}>
            {vehicle.plaka}
          </option>
        ))}
      </select>

      {selectedVehicle && (
        <div>
          <h3>Araç Detayları</h3>
          <div className="vehicle-form-inner">
            <label>Plaka</label>
            <p>{selectedVehicle.plaka}</p>
          </div>

          <div className="vehicle-form-inner">
            <label>Marka</label>
            <p>{selectedVehicle.brand}</p>
          </div>

          <div className="vehicle-form-inner">
            <label>Model</label>
            <p>{selectedVehicle.model}</p>
          </div>

          <div className="vehicle-form-inner">
            <label>Yıl</label>
            <p>{selectedVehicle.date}</p>
          </div>

          <div className="vehicle-form-inner">
            <label>Kullanım Amacı</label>
            <p>{selectedVehicle.purpose}</p>
          </div>
        </div>
      )}
    </div>
  );
}
