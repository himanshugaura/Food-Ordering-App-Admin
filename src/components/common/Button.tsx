import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  cover?: boolean;
  disable?: boolean;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  cover = false,
  disable = false,
  children = "Let's get started",
  className = "",
  ...props
}) => {
  const sizeClasses: Record<"sm" | "md" | "lg", string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  if (variant === "secondary") {
    return (
      <div className="relative inline-flex items-center justify-center gap-4 group w-full">
        <button
          className={`relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-sm cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-95 active:scale-95  ${cover ? "w-full" : ""} ${disable ? "opacity-50 cursor-not-allowed" : ""}`} 
          disabled={disable}
          {...props}
        >
          <span
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          ></span>
          <span className={`relative z-10 block rounded-xl bg-gray-950 ${sizeClasses[size]}`}>
            <div className="relative z-10 flex items-center justify-center space-x-2">
              <span className="transition-all duration-500 group-hover:translate-x-1 flex gap-4 items-center">
                {children}
              </span>
            </div>
          </span>
        </button>
      </div>
    );
  }

 

  return (
    <div className="relative inline-flex items-center justify-center gap-4 group w-full">
      <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-bl from-[#ff600082]  to-[#00ffa382] rounded-xl blur-sm filter group-hover:opacity-100 group-hover:duration-200" />
      <button
        className={`group relative flex gap-4 p-4 items-center justify-center rounded-xl bg-white font-semibold text-black transition-all duration-200 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30 hover:scale-95 active:scale-95 cursor-pointer ${cover ? "w-full" : ""} ${sizeClasses[size]} ${className}`}
        disabled={disable}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;