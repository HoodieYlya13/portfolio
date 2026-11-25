import React from "react";

interface NavItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Extra classes for the tile, such as the corners it rounds on phones. */
  tileClassName?: string;
}

export default function NavItem({ icon, children, className = "", tileClassName = "" }: NavItemProps) {
  return (
    <div className={`flex items-center gap-4 transition-opacity duration-300 ease-in-out group ${className}`}>
      <div className={`size-16 md:size-20 bg-background dark:bg-foreground backdrop-blur-md text-foreground dark:text-background rounded-lg md:rounded-xl transition-[border-radius] duration-500 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden ${tileClassName}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
