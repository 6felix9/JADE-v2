"use client";

interface DashboardButtonProps {
    title: string;
    variant?: "default" | "highlighted";
    onClick?: () => void;
}

export default function DashboardButton({
    title,
    variant = "default",
    onClick,
}: DashboardButtonProps) {
    const baseStyles =
        "flex items-center justify-center text-center p-8 rounded-lg border-2 transition-all duration-200 text-lg font-semibold h-32 w-full shadow-sm hover:shadow-md hover:-translate-y-1";

    const variants = {
        default: "bg-white border-gray-200 text-gray-700 hover:border-gray-300",
        highlighted: "bg-blue-50 border-blue-100 text-blue-900 hover:bg-blue-100 hover:border-blue-200",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]}`}
        >
            {title}
        </button>
    );
}
