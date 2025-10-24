import { HomePage } from "./Components/Pages/HomePage";
import { CheckoutPage } from "./Components/Pages/CheckoutPage";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import axios from "axios";
import type { ProductType } from "./Types/ProductType";

import "./App.css";

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    };
    const fetchCart = async () => {
      const response = await axios.get("https://fakestoreapi.com/carts");
      console.log(response.data);
    };
    fetchCart();
    fetchProducts();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage products={products} />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;
