import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoute from "./AnimatedRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        asterisk: {
          color: "#d32f2f",
        },
      },
    },
  },
  typography: {
    fontFamily: "Kanit",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <div className="content">
            <AnimatedRoute />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
