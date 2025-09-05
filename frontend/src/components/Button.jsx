export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  isActive = true, // 👈 new prop
}) {
  const baseClasses =
    "w-full mx-auto py-3 rounded-lg font-semibold text-md transition";
  const activeClasses = "bg-blue-500 hover:bg-blue-600 text-white";
  const inactiveClasses = "bg-gray-300 text-gray-500 cursor-pointer"; // 👈 light color but clickable

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`}
    >
      {children}
    </button>
  );
}
