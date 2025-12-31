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
    <div className={`space-y-3 ${containerClass}`}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
          />
          <span className={`text-gray-700 group-hover:text-gray-900 transition-colors ${textSizeClass || ""}`}>
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}

