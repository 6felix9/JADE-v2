"use client";

import { RadioOption } from "@/types";

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  className?: string;
}

export default function RadioGroup({ options, value, onChange, name, className = "" }: RadioGroupProps) {
  // Extract text size classes from className if present
  const textSizeClass = className.includes("text-") ? className.match(/text-\w+/)?.[0] : "";
  const containerClass = className.replace(/text-\w+/g, "").trim();
  
  return (
    <div className={`space-y-2 ${containerClass}`}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2 cursor-pointer group">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="w-3.5 h-3.5 text-primary border-border focus:ring-primary cursor-pointer"
          />
          <span className={`text-foreground text-sm group-hover:text-foreground/80 transition-colors ${textSizeClass || ""}`}>
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}

