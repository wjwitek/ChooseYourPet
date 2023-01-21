import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ExpertContextProvider } from "../contexts/CurrentExpertContext";
import GlobalStyle from "./GlobalStyle";
import CompareCriteria from "./CompareCriteria";
import Consistency from "./Consistency";
import ComparePets from "./ComparePets";
import Experts from "./Experts";
import Result from "./Result";
import Home from "./Home";
import theme from "../theme";

const App = () => {
  return (
    <ExpertContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/compare/criteria" element={<CompareCriteria />} />
            <Route path="/compare/pets" element={<ComparePets />} />
            <Route path="/result" element={<Result />} />
            <Route path="/consistency" element={<Consistency />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ExpertContextProvider>
  );
};

export default App;
