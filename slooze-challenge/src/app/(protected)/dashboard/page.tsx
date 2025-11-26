"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Stats = {
    totalProducts: number;
    lowStock: number;
    totalValue: number;
};

export default function Dashboard() {
    const [stats, setStats] = useState<Stats>({ totalProducts: 0, lowStock: 0, totalValue: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getProducts().then((products: any[]) => {
            const total = products.length;
            const low = products.filter(p => p.quantity < 100).length;
            const value = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

            setStats({
                totalProducts: total,
                lowStock: low,
                totalValue: value,
            });
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="text-6xl font-black text-center mt-40 animate-pulse">◈ SYNCING CORE ◈</div>;

    return (
        <div className="flex flex-col gap-8">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="panel p-8 text-center">
                    <p className="text-2xl font-bold opacity-80 tracking-widest">TOTAL COMMODITIES</p>
                    <p className="text-5xl font-black mt-4 bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                        {stats.totalProducts}
                    </p>
                </div>

                <div className="panel p-8 text-center">
                    <p className="text-2xl font-bold opacity-80 tracking-widest">LOW STOCK ALERTS</p>
                    <p className="text-5xl font-black mt-4 bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                        {stats.lowStock}
                    </p>
                </div>

                <div className="panel p-8 text-center">
                    <p className="text-2xl font-bold opacity-80 tracking-widest">INVENTORY VALUE</p>
                    <p className="text-5xl font-black mt-4 bg-linear-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                        ${stats.totalValue.toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="panel p-10 text-center">
                <p className="text-3xl font-black opacity-90">
                    ◈ QUANTUM INVENTORY SYNC: 100% ◈
                </p>
            </div>
        </div>
    );
}