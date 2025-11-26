"use client";

import { useState } from "react";
import { useAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "manager@slooze.com" && password === "123") {
            login("fake-jwt", "Manager");
            router.push("/dashboard");
        } else if (email === "keeper@slooze.com" && password === "123") {
            login("fake-jwt", "Store Keeper");
            router.push("/products");
        }
    };

    return (
        <div className="page-center">
            <div className="panel p-6 md:p-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <img src="/FFFFFF-1.png" alt="SLOOZE" className="h-24 md:h-32 mx-auto" /> 
                    <p className="text-lg mt-2 opacity-80">LOVE COMMODITIES 3000</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6 flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="EMAIL@SLOOZE.XYZ"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-lg font-mono"
                        required
                    />
                    <input
                        type="password"
                        placeholder="PASSWORD"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full text-lg font-mono"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xl tracking-wider shadow-lg hover:shadow-cyan-500/50 transition cursor-pointer"
                    >
                        ▶ ENTER SYSTEM
                    </button>
                </form>

                <div className="mt-8 text-xs font-mono text-center space-y-1 opacity-70">
                    <p>manager@slooze.com / 123</p>
                    <p>keeper@slooze.com / 123</p>
                </div>
            </div>
        </div>
    );
}