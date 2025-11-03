import { useEffect, useState, useRef} from "react";

type sortTypes = {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
};

export function Sort({ sort, setSort}: sortTypes, ) {
  const [isDropdown, setIsDropdown] = useState(false);
  const sortTypes = ["Relevence", "Price: High - Low", "Price: Low - High"];
  const dropdownRef = useRef<HTMLDivElement>(null);

  function changeSort(chosenSort: string) {
    setSort(chosenSort);
    setIsDropdown(false);
  }

  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) =>{
      if (dropdownRef?.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return ()=>{
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, []);

  

  return (
    <>
      <div className="flex flex-col w-fit" ref={dropdownRef}>
        <div
          className="flex gap-2 items-center cursor-pointer w-fit hover:text-gray-500"
          onClick={() => {
            setIsDropdown((prev) => !prev);
          }}
        >
          <div className="">Sort By</div>
          <div className="text-3xl flex items-center justify-center font-light">
            +
          </div>
        </div>
        {isDropdown && (
          <div className="relative">
            <div className="absolute border rounded flex flex-col bg-white min-w-[230px] mt-2">
              {sortTypes.map((sortType) => {
                return (
                  <div
                    className="flex gap-2 hover:bg-gray-200 px-5 py-3 cursor-pointer"
                    key={sortType}
                    onClick={() => {
                      changeSort(sortType);
                    }}
                  >
                    <input
                      type="radio"
                      className="cursor-pointer"
                      checked={sortType === sort}
                      onChange={() => {}}
                    />
                    <div className="">{sortType}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
