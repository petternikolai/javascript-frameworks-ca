import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import { CartProvider } from "./contexts/CartContext";
import About from "./pages/About";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Layout>
        </CartProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
