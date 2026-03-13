import { Link } from "react-router-dom";
import mainLogo from "../assets/images/main.png";
import { ShoppingBasket, Search } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../CartContext";

type HeaderProps = {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
};

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const cartContext = useContext(CartContext);
  const totalItems =
    cartContext?.cart.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <div className="flex items-center fixed h-20 top-0 left-0 right-0 bg-[#181818] px-5 z-[9999] shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
      {/* Logo */}
      <div className="flex flex-1 items-center">
        <Link to="/">
          <img className="w-40 cursor-pointer" src={mainLogo} alt="Logo" />
        </Link>
      </div>

      {/* Search bar */}
      <div className="flex flex-1 items-center justify-center gap-3">
        <div className="relative w-full max-w-[400px] min-w-[200px]">
          <input
            type="text"
            value={searchQuery ?? ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="h-10 w-full pl-4 pr-10 rounded-xl bg-[#2E2E2E] text-gray-200 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Search products..."
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* Cart */}
      <div className="flex flex-1 justify-end items-center">
        <Link to="/checkout" className="relative">
          <ShoppingBasket size={40} color="#ffffff" strokeWidth={1.5} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
