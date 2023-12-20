import { useState } from "react";
import NewCustomerForm from "./NewCustomerForm";
import RegisteredCustomerForm from "./RegisteredCustomerForm";

export default function Customer({
  setCustomerData,
  onCustomerDetailsReceived,
}) {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (customerType) => {
    setActiveButton(customerType);
  };

  return (
    <div className="customer-component">
      <h2>Müşteri Bilgileri</h2>
      <div className="btn-wrapper">
        <button className="btn" onClick={() => handleButtonClick("registered")}>
          Kayıtlı Kullanıcı
        </button>
        <button
          className="btn btn-add"
          onClick={() => handleButtonClick("newUser")}
        >
          Yeni Kullanıcı
        </button>
      </div>
      {activeButton === "registered" && (
        <RegisteredCustomerForm
          onCustomerDetailsReceived={onCustomerDetailsReceived}
        />
      )}
      {activeButton === "newUser" && <NewCustomerForm />}
    </div>
  );
}
