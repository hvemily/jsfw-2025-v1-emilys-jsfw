import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/Product";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import { ToastProvider } from "./components/Toast";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import RouteNotFound from "./pages/RouteNotFound";
import Layout from "./components/Layout";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>

            <Routes>
              <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<RouteNotFound />} />
              </Route>
            </Routes>


      </BrowserRouter>
    </ToastProvider>
    
  );
}



export default App;
