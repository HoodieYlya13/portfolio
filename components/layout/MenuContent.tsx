import React from "react";

interface MenuContentProps {
  children: React.ReactNode;
}

export default function MenuContent({ children }: MenuContentProps) {
  return (
    <div className="transition-[grid-template-rows] duration-500 ease-in-out grid grid-rows-[0fr] menu-content">
      <div className="overflow-hidden">
        <div className="p-2 pb-4 flex flex-col gap-3">
          {children}
        </div>
      </div>
    </div>
  );
}
