import React, { useState, useEffect } from "react";
import Packages from "./Package/Packages";
import ManageCustomer from "./ManageCustomer";
import PackageDetails from "./Package/PackageDetails";

export default function HomePage({ darkMode, toggleDarkMode }) {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customerData, setCustomerData] = useState({});

  const [vehicleData, setVehicleData] = useState({
    newVehicle: {},
    registeredVehicles: [],
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/packages");
        const data = await response.json();

        if (response.ok) {
          setPackages(data);
        } else {
          console.error("Error fetching packages:", data.error);
        }
      } catch (error) {
        console.error("Error fetching packages:", error.message);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="home-page">
      <h1>Paket Satın Al</h1>
      <div>
        <Packages
          packages={packages}
          onSelectPackage={setSelectedPackage}
          darkMode={darkMode}
        />
      </div>
      <div className="home-page-customer">
        <div>
          <ManageCustomer
            setCustomerData={setCustomerData}
            setVehicleData={setVehicleData}
            darkMode={darkMode}
          />
        </div>
        <div className="home-page-customer-component">
          <PackageDetails
            selectedPackage={selectedPackage}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
}
