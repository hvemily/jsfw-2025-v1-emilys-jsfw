import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/home";
import ProductPage from "../src/pages/product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
