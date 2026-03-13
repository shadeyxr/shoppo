import { HomePage } from "./Components/Pages/HomePage";
import CheckoutPage from "./Components/Pages/CheckoutPage";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import type { ProductType } from "./Types/Types";
import axios from "axios";
import { CartProvider } from "./cartProvider";
import "./App.css";
import { ProductPage } from "./Components/Pages/ProductPage";

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <CartProvider>
      <Routes>
        <Route
          index
          element={<HomePage products={products} loading={loading} error={error} />}
        />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/product/:id"
          element={<ProductPage products={products} />}
        />
      </Routes>
    </CartProvider>
  );
}

export default App;
