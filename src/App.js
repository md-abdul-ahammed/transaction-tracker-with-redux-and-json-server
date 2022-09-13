import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllListing from "./pages/AllListing";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-listing" element={<AllListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
