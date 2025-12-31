"use client";

import Image from "next/image";
import { UserCircle } from "lucide-react";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-2 bg-background border-b border-border shadow-sm">
            <div className="flex items-center gap-4">
                <Image
                    src="/JADE Logo Background Removed.png"
                    alt="JADE Logo"
                    width={75}
                    height={25}
                    className="object-contain"
                    priority
                />
            </div>
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-surface transition-colors text-foreground">
                    <span className="text-sm font-medium">Profile</span>
                    <UserCircle className="w-6 h-6 text-muted" />
                </button>
            </div>
        </header>
    );
}
