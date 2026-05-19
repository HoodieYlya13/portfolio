// TODO: style this

"use client";

export default function CloseButton() {
  const handleClose = () => {
    window.dispatchEvent(new CustomEvent("close-portfolio-modal"));
  };

  return (
    <button
      onClick={handleClose}
      className="text-2xl font-bold text-gray-400 hover:text-gray-700 dark:hover:text-white transition duration-200 leading-none cursor-pointer border-none bg-transparent p-0"
      aria-label="Close modal"
    >
      ✕
    </button>
  );
}
