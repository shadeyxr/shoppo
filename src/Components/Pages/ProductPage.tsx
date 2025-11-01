import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ProductType } from "../../Types/Types";
import { Header } from "../Header.tsx";
import { useContext } from "react";
import { CartContext } from "../../CartContext";

type ProductPageProps = {
  products: ProductType[];
};

export function ProductPage({ products }: ProductPageProps) {
  const { id } = useParams();
  const matchedProduct = products.find((product) => product.id === Number(id));
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState<string>();
  const [sizeNotChosen, setSizeNotChosen] = useState(false);

  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { addToCart } = cartContext;

  useEffect(()=>{
    if (matchedProduct && !matchedProduct.category.toLowerCase().includes("clothing")){
      setSize("n/a")
    }
  }, [matchedProduct])

  function renderSizeError() {
    if (sizeNotChosen === true) {
      return <div className="mb-8 text-red-700">PLEASE SELECT A SIZE</div>;
    }
  }

  function handleAdd() {
    if (!matchedProduct) return;

    if (!size) {
      setSizeNotChosen(true);
      return;
    }

    addToCart(matchedProduct, size);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1800);
  }

  function RenderSizes() {
    const category = matchedProduct?.category.includes("clothing")
    if (category)
      return (
        <div className="grid grid-cols-4 gap-2 mt-4">
          {["S", "M", "L", "XL"].map((sizeSelect) => (
            <div
              key={sizeSelect}
              onClick={() => {
                setSize(sizeSelect);
                setSizeNotChosen(false);
              }}
              className={`border text-center py-3 rounded cursor-pointer ${sizeSelect === size ? "bg-gray-200" : "hover:bg-gray-200"} `}
            >
              {sizeSelect}
            </div>
          ))}
        </div>
      );
  }

  return (
    <>
      <Header />

      <div className="flex h-full pt-20 ">
        <div className="flex flex-1 px-10 py-10 justify-center min-w-[300px]">
          <img
            className="w-full h-auto max-w-md object-contain"
            src={matchedProduct?.image}
          />
        </div>
        <div
          className="flex flex-col flex-1 px-20 py-20 justify-between items-stretch 
                        max-w-[800px] mx-auto"
        >
          <div className="flex flex-col">
            <div className="text-2xl font-bold mb-1">
              {matchedProduct?.title}
            </div>
            <div className="text-xl font-medium">
              ${matchedProduct?.price?.toFixed(2)}
            </div>
            <div className="mt-5 text-gray-700 leading-relaxed">
              {matchedProduct?.description}
            </div>
          </div>

          <div className="mb-2 ">
            {renderSizeError()}
            {RenderSizes()}
            <div
              className={`mt-8 text-center ${added ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"} text-white py-3 rounded-lg 
                             transition cursor-pointer w-full`}
              onClick={() => {
                handleAdd();
              }}
            >
              Add to cart
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
