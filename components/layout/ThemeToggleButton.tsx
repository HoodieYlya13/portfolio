import { useState, useEffect } from "react";
import NavItem from "./NavItem";
import RollingText from "./RollingText";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const value = "; " + document.cookie;
    const parts = value.split("; theme=");
    let currentTheme = "light";
    if (parts.length === 2) currentTheme = parts.pop()?.split(";").shift() || "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(currentTheme);
  }, []);

  const handleThemeToggle = () => {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    
    document.cookie = `theme=${newTheme};path=/;max-age=31536000`;
    setTheme(newTheme);

    if (newTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  return (
    <button
      onClick={handleThemeToggle}
      className="w-full text-left"
    >
      <NavItem
        icon={
          theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 group-hover:h-7 md:h-10 md:group-hover:h-9 transition-all duration-300 ease-in-out w-auto"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 group-hover:h-7 md:h-10 md:group-hover:h-9 transition-all duration-300 ease-in-out w-auto"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )
        }
      >
        <RollingText text="Theme" className="text-xl font-medium" />
      </NavItem>
    </button>
  );
}
