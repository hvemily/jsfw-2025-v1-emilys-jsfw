import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Senere kan du legge til:
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
