"use client";

import { useAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Package, LayoutDashboard, Sun, Moon } from "lucide-react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { role, logout } = useAuth();
    const router = useRouter();
    const [isDark, setIsDark] = useState(
        typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    if (!role) return null;
    const isManager = role === "Manager";

    return (
        <div className="min-h-screen flex">

            <aside className="w-80 panel border-r-4 border-cyan-500">
                <div className="p-8">
                    <img src="/FFFFFF-1.png" alt="SLOOZE" className="h-24 mx-auto" /> 
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                    <button
                        onClick={() => { logout(); router.push("/login"); }}
                        className="w-full py-4 bg-red-600 hover:bg-red-500 text-2xl font-bold tracking-wider cursor-pointer"
                    >
                        🤬 LOGOUT
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
                        className="p-4 rounded-full bg-white/30 hover:bg-white/50 transition backdrop-blur cursor-pointer"
                    >
                        {isDark ? <Sun className="w-8 h-8" /> : <Moon className="w-8 h-8" />}
                    </button>
                </header>
                <div className="panel p-10">{children}</div>
            </main>
        </div>
    );
}