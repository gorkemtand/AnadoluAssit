// App.jsx
import React, { useState } from "react";
import Layout from "./Layout";
import HomePage from "./HomePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#212121" : "#f1efef", // Dark mode and light mode background color
        paper: darkMode ? "#333" : "#ffffff", // Dark mode and light mode surface color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout toggleDarkMode={toggleDarkMode}>
        {/* Pass dark mode state and toggle function to HomePage */}
        <HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
