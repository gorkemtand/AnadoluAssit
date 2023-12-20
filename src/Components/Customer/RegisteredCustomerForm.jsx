import { useState } from "react";

export default function RegisteredCustomerForm({ onCustomerDetailsReceived }) {
  const [tcKimlikNo, setTcKimlikNo] = useState("");
  const [customerDetails, setCustomerDetails] = useState(null);

  const handleInputChange = (e) => {
    setTcKimlikNo(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/api/customers/${tcKimlikNo}`
      );
      const data = await response.json();

      if (response.ok) {
        setCustomerDetails(data);
        // Corrected method name here
        onCustomerDetailsReceived(data, tcKimlikNo);
      } else {
        console.error("Error fetching customer details:", data.error);
      }
    } catch (error) {
      console.error("Error fetching customer details:", error.message);
    }
  };

  return (
    <form
      id="registeredCustomerForm"
      onSubmit={handleFormSubmit}
      className="customer-form"
    >
      <label>TC Kimlik No</label>
      <input
        className="input"
        id="tcNo"
        name="tcKimlikNo"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={handleInputChange}
        value={tcKimlikNo}
        onKeyPress={(e) => {
          // Allow only numeric input
          if (e.key < "0" || e.key > "9") {
            e.preventDefault();
          }
        }}
      />

      {customerDetails && (
        <>
          <label>Ad</label>
          <input
            className="input"
            id="fName"
            name="fName"
            type="text"
            readOnly
            value={customerDetails.fName}
          />
          <label>Soyad</label>
          <input
            className="input"
            id="lName"
            name="lName"
            type="text"
            readOnly
            value={customerDetails.lName}
          />
          <label>Şehir</label>
          <input
            className="input"
            id="city"
            name="city"
            type="text"
            readOnly
            value={customerDetails.city}
          />

          <label>İlçe</label>
          <input
            className="input"
            id="province"
            name="province"
            type="text"
            readOnly
            value={customerDetails.province}
          />

          <label>Adres</label>
          <textarea
            className="input"
            name="address"
            readOnly
            value={customerDetails.address}
          ></textarea>
        </>
      )}
      <div className="submit-btn-wrapper">
        <button className="btn btn-submit" type="submit">
          Kullanıcıyı Bul
        </button>
      </div>
    </form>
  );
}
