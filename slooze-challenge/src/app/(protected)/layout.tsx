"use client";

import { useAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Package, LayoutDashboard, Sun, Moon } from "lucide-react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { role, logout } = useAuth();
    const router = useRouter();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (!role) router.replace("/login");
        document.documentElement.classList.toggle("dark", isDark);
    }, [role, router, isDark]);

    if (!role) return null;
    const isManager = role === "Manager";

    return (
        <div className="min-h-screen flex">
            
            <aside className="w-80 panel border-r-4 border-cyan-500">
                <div className="p-8">
                    <h1 className="text-5xl font-black tracking-wider flex items-center gap-4">
                        <Package className="w-16 h-16" /> SLOOZE
                    </h1>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                    <button
                        onClick={() => { logout(); router.push("/login"); }}
                        className="w-full py-4 bg-red-600 hover:bg-red-500 text-2xl font-bold tracking-wider"
                    >
                        ▓ LOGOUT
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 p-10">
                <header className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-black tracking-wider">
                        {isManager ? "MANAGER CORE" : "KEEPER NODE"}
                    </h2>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="p-4 rounded-full bg-white/30 hover:bg-white/50 transition backdrop-blur"
                    >
                        {isDark ? <Sun className="w-8 h-8" /> : <Moon className="w-8 h-8" />}
                    </button>
                </header>
                <div className="panel p-10">{children}</div>
            </main>
        </div>
    );
}