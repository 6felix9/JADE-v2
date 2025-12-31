"use client";

import Button from "./Button";

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
    const dashboardVariants = {
        default: "bg-white border-gray-200 text-gray-700 hover:border-gray-300",
        highlighted: "bg-blue-50 border-blue-100 text-blue-900 hover:bg-blue-100 hover:border-blue-200",
    };

    return (
        <Button
            variant="secondary"
            onClick={onClick}
            className={`!p-8 !border-2 !text-lg !font-semibold h-32 w-full hover:shadow-md hover:-translate-y-1 ${dashboardVariants[variant]}`}
        >
            {title}
        </Button>
    );
}
