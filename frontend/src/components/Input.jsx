import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Input({ label, type = "text", name, value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  // Agar ye password input hai to toggle karega, warna normal input
  const isPasswordField = type === "password";
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-4 relative">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full relative p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {/* Eye icon only for password field */}
      {isPasswordField && (
        <span
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}

    </div>
  );
}
export default Input;
