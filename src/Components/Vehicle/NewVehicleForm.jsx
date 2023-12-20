import React, { useState } from "react";
import brandsAndModels from "../../VehicleData";

export default function NewVehicleForm({ tcKimlikNo }) {
  const [vehicleData, setVehicleData] = useState({
    plaka: "",
    brand: "",
    model: "",
    date: "",
    purpose: "Bireysel",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "brand") {
      setVehicleData({
        ...vehicleData,
        brand: value,
        model: "",
      });
    } else {
      setVehicleData({
        ...vehicleData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/api/customers/${tcKimlikNo}/vehicles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vehicleData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Vehicle added successfully:", data);
        setVehicleData({
          plaka: "",
          brand: "",
          model: "",
          date: "",
          purpose: "Bireysel",
        });
      } else {
        console.error("Error adding vehicle:", data.error);
      }
    } catch (error) {
      console.error("Error adding vehicle:", error.message);
    }
  };

  return (
    <form id="newVehicleForm" className="vehicle-form" onSubmit={handleSubmit}>
      <label>Plaka</label>
      <input
        className="input"
        type="text"
        name="plaka"
        value={vehicleData.plaka}
        onChange={handleInputChange}
        required
      />

      <label>Marka</label>
      <select
        className="input"
        name="brand"
        value={vehicleData.brand}
        onChange={handleInputChange}
        required
      >
        <option value="">Select a brand</option>
        {brandsAndModels.map((brandObj) => (
          <option key={brandObj.brand} value={brandObj.brand}>
            {brandObj.brand}
          </option>
        ))}
      </select>

      <label>Model</label>
      <select
        className="input"
        name="model"
        value={vehicleData.model}
        onChange={handleInputChange}
        required
      >
        <option value="">Select a model</option>
        {vehicleData.brand &&
          brandsAndModels
            .find((brandObj) => brandObj.brand === vehicleData.brand)
            .models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
      </select>

      <label>Yıl</label>
      <select
        className="input"
        name="date"
        value={vehicleData.date}
        onChange={handleInputChange}
        required
      >
        <option value="">Select a year</option>
        {Array.from({ length: 35 }, (_, index) => 1990 + index).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <label>Kullanım Amacı</label>
      <select
        className="input"
        name="purpose"
        value={vehicleData.purpose}
        onChange={handleInputChange}
        required
      >
        <option value="Bireysel">Bireysel</option>
        <option value="Ticari">Ticari</option>
      </select>
      <div className="submit-btn-wrapper">
        <button className="btn btn-submit" type="submit">
          Araç Ekle
        </button>
      </div>
    </form>
  );
}
