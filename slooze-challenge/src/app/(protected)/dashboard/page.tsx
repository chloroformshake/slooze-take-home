export default function Dashboard() {
    return (
        <div className="flex flex-col gap-8">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: "TOTAL COMMODITIES", value: "1,284", color: "from-cyan-400 to-blue-600" },
                    { label: "LOW STOCK ALERTS", value: "19", color: "from-orange-500 to-red-600" },
                    { label: "MONTHLY REVENUE", value: "$248,721", color: "from-green-400 to-emerald-600" },
                ].map((stat) => (
                    <div key={stat.label} className="panel p-8 text-center">
                        <p className="text-2xl font-bold opacity-80 tracking-widest">{stat.label}</p>
                        <p className={`text-7xl font-black mt-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="panel p-10">
                <h2 className="text-4xl font-black mb-6">◈ SYSTEM STATUS ◈</h2>
                <p className="text-xl opacity-90 leading-relaxed">
                    All nodes operational • Quantum inventory sync: 100% • Neo-Tokyo warehouse online
                </p>
            </div>
        </div>
    );
}