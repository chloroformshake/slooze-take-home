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
        // Demo credentials
        if (email === "manager@slooze.com" && password === "123") {
            login("fake-jwt", "Manager");
            router.push("/dashboard");
        } else if (email === "keeper@slooze.com" && password === "123") {
            login("fake-jwt", "Store Keeper");
            router.push("/products");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-indigo-600 rounded-full mx-auto flex items-center justify-center mb-4">
                        <LogIn className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold">Slooze</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Commodities Management</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-sm text-gray-500 text-center">
                    <p>Manager: manager@slooze.com / 123</p>
                    <p>Store Keeper: keeper@slooze.com / 123</p>
                </div>
            </div>
        </div>
    );
}