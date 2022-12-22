import { BrowserRouter, Route, Routes } from "react-router-dom";
import Compare from "./Compare";
import Result from "./Result";
import Welcome from "./Welcome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Welcome />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/result/*" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
