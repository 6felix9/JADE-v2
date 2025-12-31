"use client";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline" | "highlight";
  size?: "sm" | "md" | "lg" | "xl" | "icon";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  children,
  className = "",
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-background hover:bg-primary-hover focus:ring-primary shadow-sm hover:shadow-md",
    secondary: "bg-surface border border-border text-foreground hover:bg-border/10 focus:ring-border",
    outline: "bg-transparent border border-border text-foreground hover:bg-surface focus:ring-border",
    ghost: "bg-transparent text-muted hover:bg-surface focus:ring-border",
    danger: "bg-danger text-background hover:bg-danger/90 focus:ring-danger shadow-sm hover:shadow-md",
    highlight: "bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 focus:ring-primary",
  };

  const sizes = {
    icon: "p-1 rounded-full",
    sm: "px-3 py-1.5 text-sm rounded",
    md: "px-6 py-2 rounded-md",
    lg: "px-10 py-3 text-lg rounded-lg",
    xl: "px-8 py-8 text-xl font-bold border-2 rounded-xl h-32",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
}

