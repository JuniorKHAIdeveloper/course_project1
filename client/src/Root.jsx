import React from "react";
import Navigation from "./components/Navigation";
import Container from "@mui/material/Container";
import Footer from "./components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#BC986A",
    },
    error: {
      // This is green.A700 as hex.
      main: "#DAAD86",
    },
    success: {
      // This is green.A700 as hex.
      main: "#fbe288",
    },
    warning: {
      // This is green.A700 as hex.
      main: "#d32f2f",
    },
    red: {
      // This is green.A700 as hex.
      main: "#d32f2f",
    },
  },
});

const Routes = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container
        style={{
          minHeight: "97vh",
          paddingBottom: "52.5px",
          position: "relative",
        }}
      >
        <Navigation />
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default Routes;
