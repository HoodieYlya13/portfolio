interface RollingTextProps {
  text: string;
  className?: string;
}

export default function RollingText({ text, className = "" }: RollingTextProps) {
  return (
    <div className={`relative overflow-hidden h-[1.2em] ${className}`}>
      <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
        {text}
      </span>
      <span className="absolute inset-0 block transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
        {text}
      </span>
    </div>
  );
}
