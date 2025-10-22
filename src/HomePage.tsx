import { Header } from "./Header";

export function HomePage() {
  return (
    <>
      <Header />

      <div className="pt-20">
        <div className="products-grid grid grid-cols-5 gap-10 mx-15 mt-5">
          <div className="bg-gray-200 h-80">Product 1</div>
          <div className="bg-gray-200 h-80">Product 1</div>
          <div className="bg-gray-200 h-80">Product 1</div>
          <div className="bg-gray-200 h-80">Product 1</div>
          <div className="bg-gray-200 h-80">Product 1</div>
        </div>
      </div>
    </>
  );
}
