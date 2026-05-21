// TODO: style this

"use client";

export default function CloseButton() {
  const handleClose = () => {
    window.dispatchEvent(new CustomEvent("close-portfolio-modal"));
  };

  return (
    <button
      onClick={handleClose}
      className="text-2xl font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 leading-none cursor-pointer border-none bg-transparent p-0 hover:scale-110 active:scale-95"
      aria-label="Close modal"
    >
      ✕
    </button>
  );
}
