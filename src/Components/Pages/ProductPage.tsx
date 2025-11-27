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

  useEffect(() => {
    if (matchedProduct && !matchedProduct.category.toLowerCase().includes("clothing")) {
      setSize("n/a");
    }
  }, [matchedProduct]);

  function renderSizeError() {
    if (sizeNotChosen) {
      return <div className="mb-4 text-red-700 text-center sm:text-left">PLEASE SELECT A SIZE</div>;
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
    const category = matchedProduct?.category.toLowerCase().includes("clothing");
    if (category)
      return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {["S", "M", "L", "XL"].map((sizeSelect) => (
            <div
              key={sizeSelect}
              onClick={() => {
                setSize(sizeSelect);
                setSizeNotChosen(false);
              }}
              className={`border text-center py-3 rounded cursor-pointer ${
                sizeSelect === size ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
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

      {/* Responsive container: stack on mobile, row on desktop */}
      <div className="flex flex-col lg:flex-row pt-24 px-4 sm:px-6 md:px-10 lg:px-20 gap-10" >
        {/* Product Image */}
        <div className="flex justify-center items-center flex-1">
          <img
            className="w-full max-w-sm sm:max-w-md object-contain"
            src={matchedProduct?.image}
            alt={matchedProduct?.title}
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-1 gap-6">
          <div className="flex flex-col">
            <div className="text-2xl font-bold mb-1">{matchedProduct?.title}</div>
            <div className="text-xl font-medium">${matchedProduct?.price?.toFixed(2)}</div>
            <div className="mt-4 text-gray-700 leading-relaxed">
              {matchedProduct?.description}
            </div>
          </div>

          <div>
            {renderSizeError()}
            {RenderSizes()}

            <div
              className={`mt-6 text-center ${
                added ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
              } text-white py-3 rounded-lg transition cursor-pointer w-full`}
              onClick={handleAdd}
            >
              Add to cart
            </div>
          </div>
        </div>
      </div>
    </>
  );
}