"use client";
import { HiMagnifyingGlass } from "react-icons/hi2";

// =====================================================
// BUTTON  COMPONENT ================================
// =====================================================
const Button = () => {
  // handle search
  const handleSearch = () => {
    console.log("searching...");
  };

  // RETURN ==========================================
  return (
    <div className="flex items-center border border-gray-300 rounded-md py-1.5 px-2.5">
      <input
        type="text"
        className="w-full outline-none"
        placeholder="Search for news..."
      />
      <button className="ml-2" onClick={handleSearch}>
        <HiMagnifyingGlass />
      </button>
    </div>
  );
};

export default Button;
