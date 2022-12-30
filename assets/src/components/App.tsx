import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import CompareCriteria from "./CompareCriteria";
import Consistency from "./Consistency";
import ComparePets from "./ComparePets";
import Result from "./Result";
import Home from "./Home";
import theme from "../theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/compare/criteria" element={<CompareCriteria />} />
          <Route path="/compare/pets" element={<ComparePets />} />
          <Route path="/result" element={<Result />} />
          <Route path="/consistency" element={<Consistency />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
