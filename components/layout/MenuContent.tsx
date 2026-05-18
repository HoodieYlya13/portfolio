"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggleButton from "./ThemeToggleButton";
import NavItem from "./NavItem";
import RollingText from "./RollingText";

export default function MenuContent() {
  const links = [
    { name: "Home", href: "/", src: "/img/logo.png", alt: "Home Logo" },
    { name: "Projects", href: "/projects", src: "/img/logo.png", alt: "Projects Icon" },
    { name: "Education", href: "/education", src: "/img/logo.png", alt: "Education Icon" },
    { name: "Experience", href: "/experience", src: "/img/logo.png", alt: "Experience Icon" },
    { name: "Contact", href: "/contact", src: "/img/logo.png", alt: "Contact Icon" },
  ];

  const handleLinkClick = () => {
    const checkbox = document.getElementById("menu-toggle") as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  };

  return (
    <>
      {links.map((link, index) => (
        <Link 
          key={link.name} 
          href={link.href} 
          className="w-full block menu-item transform translate-y-10 opacity-0 transition-all duration-500 ease-out"
          style={{ transitionDelay: `${index * 75}ms` }}
          onClick={handleLinkClick}
        >
          <NavItem
            icon={
              <Image
                src={link.src}
                alt={link.alt}
                width={52}
                height={52}
                className="object-contain size-13 group-hover:size-12 md:size-15 md:group-hover:size-14 transition-all duration-300 ease-in-out"
              />
            }
          >
            <RollingText text={link.name} className="text-xl font-medium" />
          </NavItem>
        </Link>
      ))}

      <div 
        className="w-full menu-item transform translate-y-10 opacity-0 transition-all duration-500 ease-out"
        style={{ transitionDelay: `${links.length * 75}ms` }}
      >
        <ThemeToggleButton />
      </div>
    </>
  );
}
