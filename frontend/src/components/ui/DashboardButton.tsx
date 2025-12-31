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
    return (
        <Button
            variant={variant === "highlighted" ? "highlight" : "secondary"}
            size="xl"
            fullWidth
            onClick={onClick}
            className="hover:shadow-md hover:-translate-y-1"
        >
            {title}
        </Button>
    );
}
