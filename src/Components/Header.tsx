import { Link } from "react-router-dom";
import cartLogo from '../assets/images/cart.png'
import searchLogo from '../assets/images/search.png'
import mainLogo from '../assets/images/main.png'

export function Header() {
  return (
    <>
      <div className="flex items-center fixed h-20 top-0 left-0 right-0 bg-[#181818] px-5">
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
              className="h-10 w-full pl-4 pr-10 rounded-xl bg-[#2E2E2E] text-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Search"
            />
            {/* Search icon inside input */}
            <img
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 filter invert cursor-pointer"
              src={searchLogo}
              alt="Search"
            />
          </div>
        </div>

        {/* Cart */}
        <div className="flex flex-1 justify-end items-center">
          <Link to="/checkout">
            <img className="w-11 cursor-pointer" src={cartLogo} alt="Cart" />
          </Link>
        </div>
      </div>
    </>
  );
}
