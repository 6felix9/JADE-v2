"use client";

import Image from "next/image";
import { UserCircle } from "lucide-react";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-2 bg-white border-b border-gray-100 shadow-sm">
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
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors text-gray-700">
                    <span className="text-sm font-medium">Profile</span>
                    <UserCircle className="w-6 h-6 text-gray-400" />
                </button>
            </div>
        </header>
    );
}
