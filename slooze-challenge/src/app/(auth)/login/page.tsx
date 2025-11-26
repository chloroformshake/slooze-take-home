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
            return;
        }

        if (email === "keeper@slooze.com" && password === "123") {
            login("fake-jwt", "Store Keeper");
            router.push("/products");
        }
    };

    return (
        <div className="page-center max-w-4xl mx-auto">
            <div className="panel max-w-md w-full p-10 shadow-xl">
                <div className="text-center mb-10">
                    <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center mx-auto mb-5 shadow-lg">
                        <LogIn className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Slooze</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1 tracking-wide">
                        Commodities Management
                    </p>
                </div>

                <form className="space-y-6 flex flex-col gap-4" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 text-base backdrop-blur-md"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 text-base backdrop-blur-md"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg font-semibold text-white tracking-wide
                                   bg-indigo-600 hover:bg-indigo-700 transition shadow-md
                                   backdrop-blur-sm"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-sm text-slate-600 dark:text-slate-400 text-center leading-relaxed">
                    <p>Manager: manager@slooze.com / 123</p>
                    <p>Store Keeper: keeper@slooze.com / 123</p>
                </div>
            </div>
        </div>
    );
}