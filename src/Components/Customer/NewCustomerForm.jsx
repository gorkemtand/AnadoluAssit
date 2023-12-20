import { useState } from "react";
import citiesAndProvinces from "../../CityData";

export default function NewCustomerForm() {
  const [userData, setUserData] = useState({
    tcKimlikNo: "",
    fName: "",
    lName: "",
    city: "",
    province: "",
    address: "",
  });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
  
    if (name === "city") {
      setUserData({
        ...userData,
        city: value,
        province: "",
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("Customer created successfully");
        setUserData({
          tcKimlikNo: "",
          fName: "",
          lName: "",
          city: "",
          province: "",
          address: "",
        });
      } else {
        console.error("Error creating customer:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating customer:", error.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="customer-form">
      <label>TC Kimlik No</label>
      <input
        className="input"
        id="tcNo"
        name="tcKimlikNo"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={userData.tcKimlikNo}
        onChange={handleInputChange}
        onKeyPress={(e) => {
          // Allow only numeric input
          if (e.key < "0" || e.key > "9") {
            e.preventDefault();
          }
        }}
      />
      <label>Ad</label>
      <input
        className="input"
        id="fName"
        name="fName"
        type="text"
        value={userData.fName}
        onChange={handleInputChange}
      />
      <label>Soyad</label>
      <input
        className="input"
        id="lName"
        name="lName"
        type="text"
        value={userData.lName}
        onChange={handleInputChange}
      />
      <label>Şehir</label>
      <select
        className="input"
        id="city"
        name="city"
        value={userData.city}
        onChange={handleInputChange}
      >
        <option value="">Select a city</option>
        {citiesAndProvinces.map((cityObj) => (
          <option key={cityObj.city} value={cityObj.city}>
            {cityObj.city}
          </option>
        ))}
      </select>
      <label>İlçe</label>
      <select
        className="input"
        id="province"
        name="province"
        value={userData.province}
        onChange={handleInputChange}
      >
        <option value="">Select a province</option>
        {userData.city &&
          citiesAndProvinces
            .find((cityObj) => cityObj.city === userData.city)
            .provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
      </select>
      <label>Adres</label>
      <textarea
        className="input"
        name="address"
        value={userData.address}
        onChange={handleInputChange}
      ></textarea>
      <div className="submit-btn-wrapper">
        <button className="btn btn-submit" type="submit">
          Yeni Kullanıcı Ekle
        </button>
      </div>
    </form>
  );
}
