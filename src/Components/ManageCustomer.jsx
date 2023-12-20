// ManageCustomer.jsx
import { useState } from "react";
import Customer from "./Customer/Customer";
import Vehicle from "./Vehicle/Vehicle";
import { useTheme } from "@mui/material/styles";

export default function ManageCustomer({ setCustomerData, setVehicleData, setPackageDetails, darkMode }) {
  const [tcKimlikNo, setTcKimlikNo] = useState("");
  const theme = useTheme();

   // Use theme.palette and other properties to access theme details
   const lightModeStyles = {
    backgroundColor: "#f7f7f7",
    color: theme.palette.text.primary,
    // Add other light mode styles as needed
  };

  const darkModeStyles = {
    backgroundColor: "#5a5a5a",
    color: theme.palette.text.primary,
    // Add other dark mode styles as needed
  };

  // Use the appropriate styles based on the current mode
  const packageStyles = darkMode ? darkModeStyles : lightModeStyles;

  const handleCustomerDetailsReceived = (customerDetails, tcKimlikNo) => {
    setCustomerData(customerDetails);
    setTcKimlikNo(tcKimlikNo);
  };

  return (
    <div className="manage-customer" style={packageStyles}>
      <Customer setCustomerData={setCustomerData} onCustomerDetailsReceived={handleCustomerDetailsReceived}/>
      <Vehicle setVehicleData={setVehicleData} tcKimlikNo={tcKimlikNo} />
    </div>
  );
}
