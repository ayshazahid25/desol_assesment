// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff", // Your primary color
    },
    text: {
      primary: "#000", // Your primary text color
      disabled: "#ccc", // Your disabled text color
    },
  },
  // Other theme configurations...
});

export default theme;
