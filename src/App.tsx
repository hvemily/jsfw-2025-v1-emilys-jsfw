import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import ProductPage from "../src/pages/Product";
import Cart from "../src/pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
