import React from "react";
import { useTheme } from "@mui/material/styles";

export default function Packages({ packages, onSelectPackage, darkMode }) {
  const theme = useTheme();

  // Define styles for both light and dark modes
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

  return (
    <div className="package-wrapper" style={packageStyles}>
      {packages.map((packageItem, index) => (
        <div
          className="packages"
          key={index}
          onClick={() => onSelectPackage(packageItem)}
        >
          <img src={packageItem.imageSrc} alt={`package-${index}`} />
          <p>{packageItem.title}</p>
        </div>
      ))}
    </div>
  );
}
