import React, { useState, useRef, useEffect } from "react";
import { banks } from "../store/Data";

const BankSelect = ({ bankName, setBankName, setError }) => {
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  const filteredBanks = banks.filter((bank) =>
    bank.toLowerCase().includes(query.trim().toLowerCase())
  );

  const showDropdown = query.trim().length > 0 && !bankName;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <label className="block mb-1">
        Bank Name <span className="text-red-500">*</span>
      </label>

      <input
        type="text"
        value={query || bankName}
        onChange={(e) => {
          setQuery(e.target.value);
          setBankName("");
          setError(false);
        }}
        placeholder="Type to search bank..."
        className="border border-gray-400 rounded-xl p-2 w-full outline-none focus:border-green-600"
      />

      {showDropdown && filteredBanks.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-60 overflow-y-auto shadow-lg">
          {filteredBanks.map((bank) => (
            <li
              key={bank}
              onClick={() => {
                setBankName(bank);
                setQuery(bank);
                setError(false);
              }}
              className="p-2 hover:bg-green-50 cursor-pointer"
            >
              {bank}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BankSelect;