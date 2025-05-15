import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/Product";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ToastProvider } from "./components/Toast";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
}



export default App;
