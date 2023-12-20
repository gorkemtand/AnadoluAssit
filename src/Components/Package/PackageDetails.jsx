import React, { useState } from "react";
import PackageForm from "./PackageForm";
import PackageSpec from "./PackageSpec";
import { useTheme } from "@mui/material/styles";

export default function PackageDetails({ selectedPackage, darkMode }) {
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
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

  const handlePriceChange = (index) => {
    setSelectedPriceIndex(index);
  };

  // Check if selectedPackage is null
  if (!selectedPackage) {
    return <p className="warning">Paket Detaylarını Görmek İçin Lütfen Bir Paket Seçiniz...</p>;
  }

  const calculatedPrice =
    (selectedPackage.pricingDetails[selectedPriceIndex].fiyat *
      selectedPackage.pricingDetails[selectedPriceIndex].komisyon) /
    100;

  return (
    <div className="package-details" style={packageStyles}>
      <h1>Paket Özellikleri</h1>
      <div className="package-details-wrapper">
        <div className="package-details-left">
          <div className="package-details-head">
            <div className="package-details-head-component yaş">
              <h4>Araç Yaş Sınırı</h4>
              <p>{selectedPackage.yaş} Yıl</p>
            </div>
            <div className="package-details-head-component komisyon">
              <h4>Komisyon</h4>
              <p>₺ {calculatedPrice}</p>
              <p>
                Oran: %
                {selectedPackage.pricingDetails[selectedPriceIndex].komisyon}
              </p>
            </div>
          </div>
          <div>
            <PackageForm
              pricingDetails={selectedPackage.pricingDetails}
              onPriceChange={handlePriceChange}
            />
          </div>
        </div>
        <div className="package-details-right">
          <PackageSpec
            title={selectedPackage.title}
            description={selectedPackage.description}
            fiyat={selectedPackage.pricingDetails[selectedPriceIndex].fiyat}
            includedHeaders={selectedPackage.specs.included}
            excluded={selectedPackage.specs.excluded}
          />
        </div>
      </div>
    </div>
  );
}
