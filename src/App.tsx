import { HomePage } from "./Components/Pages/HomePage";
import { useState, useEffect } from "react";
import axios from "axios";
import type { ProductType } from "./Types/ProductType";

import "./App.css";

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      console.log(response.data);
    };
    fetchProducts();
  }, []);

  return <HomePage products={products} />;
}

export default App;
