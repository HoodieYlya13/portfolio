"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggleButton from "./ThemeToggleButton";
import NavItem from "./NavItem";

export default function MenuContent() {
  const links = [
    { name: "Home", href: "/", initial: "HY13dev.com" },
    { name: "Projects", href: "/projects", initial: "Projects" },
    { name: "Education", href: "/education", initial: "Education" },
    { name: "Experience", href: "/experience", initial: "Experience" },
    { name: "Contact", href: "/contact", initial: "Contact" },
  ];

  const handleLinkClick = () => {
    const checkbox = document.getElementById("menu-toggle") as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  };

  return (
    <>
      {links.map((link) => (
        <Link 
          key={link.name} 
          href={link.href} 
          className="w-full"
          onClick={handleLinkClick}
        >
          <NavItem
            icon={
              link.name === "Home" ? (
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={52}
                  height={52}
                  className="object-contain size-13 group-hover:size-12 transition-all duration-300 ease-in-out"
                />
              ) : (
                link.initial
              )
            }
          >
            <span className="text-xl font-medium transition-opacity duration-300 ease-in-out group-hover:opacity-70">
              {link.name}
            </span>
          </NavItem>
        </Link>
      ))}

      <ThemeToggleButton />
    </>
  );
}
