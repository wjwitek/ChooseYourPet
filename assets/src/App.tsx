import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Compare from "./Compare";
import Result from "./Result";
import Welcome from "./Welcome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/result/:uuid" element={<Result />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
