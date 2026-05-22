import Link from "next/link";
import Image from "next/image";
import NavItem from "./NavItem";
import NavbarContainer from "./NavbarContainer";
import MenuContent from "./MenuContent";
import ThemeToggleButton from "./ThemeToggleButton";
import RollingText from "./RollingText";
import NavbarSlidingTitles from "./NavbarSlidingTitles";

export default function Navbar() {
  const links = [
    { name: "Home", href: "/", src: "/logo.png", alt: "HY13dev Logo" },
    {
      name: "Projects",
      href: "/projects",
      src: "/img/vibe-coder.png",
      alt: "Projects Icon",
    },
    {
      name: "Education",
      href: "/education",
      src: "/img/logo-polytech.png",
      alt: "Education Icon",
    },
    {
      name: "Experience",
      href: "/experience",
      src: "/img/logo-equasens.png",
      alt: "Experience Icon",
    },
    {
      name: "Contact",
      href: "/contact",
      src: "/img/contact-me.png",
      alt: "Contact Icon",
    },
    {
      name: "YlyaBot",
      href: "/ylya-bot",
      src: "/img/ylya-bot.png",
      alt: "YlyaBot Icon",
    },
  ];

  return (
    <>
      <input type="checkbox" id="menu-toggle" className="hidden peer" />

      <label
        htmlFor="menu-toggle"
        className="fixed inset-0 z-40 hidden peer-checked:block cursor-default"
      />

      <NavbarContainer>
        <MenuContent>
          {links.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className="w-full block menu-item transform translate-y-10 opacity-0 transition-all duration-500 ease-out"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <NavItem
                icon={
                  <Image
                    src={link.src}
                    alt={link.alt}
                    width={52}
                    height={52}
                    className="object-contain size-13 group-hover:size-12 md:size-15 md:group-hover:size-14 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
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
        </MenuContent>

        <div className="px-2 pb-2 flex items-center justify-between relative pt-2 bottom-bar">
          <div className="absolute top-0 left-[2.5%] w-[95%] h-px bg-background/20 dark:bg-foreground/20 transition-transform duration-250 ease-in-out origin-left scale-x-0 line-sep" />

          <NavItem
            icon={
              <Link href="/" className="size-full block">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="size-full object-cover object-center"
                >
                  <source src="/memoji-video.mov" type="video/quicktime" />
                  <source src="/memoji-video.webm" type="video/webm" />
                </video>
              </Link>
            }
            className="flex-1 min-w-0"
          >
            <Link href="/" className="w-fit">
              <div className="font-bold md:text-lg uppercase tracking-wide">
                Ylya Martchenko
              </div>
            </Link>
            <NavbarSlidingTitles />
          </NavItem>

          <label
            htmlFor="menu-toggle"
            className="p-3 focus:outline-none hover:opacity-70 transition-opacity duration-300 ease-in-out cursor-pointer"
            aria-label="Toggle Menu"
          >
            {/* Hamburger Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon-menu block size-6 md:size-8"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            {/* X Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon-close hidden size-6 md:size-8"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </label>
        </div>
      </NavbarContainer>
    </>
  );
}
