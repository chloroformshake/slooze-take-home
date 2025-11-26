"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Plus, Edit2, Trash2 } from "lucide-react";

type Product = { id: number; name: string; category: string; quantity: number; price: number };

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);
    const [form, setForm] = useState({ name: "", category: "", quantity: "", price: "" });

    const loadProducts = async () => {
        const data = await api.getProducts();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => { loadProducts(); }, []);

    const openModal = (product?: Product) => {
        if (product) {
            setEditing(product);
            setForm({ name: product.name, category: product.category, quantity: String(product.quantity), price: String(product.price) });
        } else {
            setEditing(null);
            setForm({ name: "", category: "", quantity: "", price: "" });
        }
        setShowModal(true);
    };

    const saveProduct = async () => {
        const payload = { ...form, quantity: +form.quantity, price: +form.price };
        if (editing) {
            await api.updateProduct(editing.id, payload);
        } else {
            await api.addProduct(payload);
        }
        loadProducts();
        setShowModal(false);
    };

    const deleteProduct = async (id: number) => {
        if (confirm("▓ DELETE COMMODITY?")) {
            await api.deleteProduct(id);
            loadProducts();
        }
    };

    if (loading) return <div className="text-6xl font-black text-center mt-40 animate-pulse">◈ LOADING MATRIX ◈</div>;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <button onClick={() => openModal()} className="flex items-center gap-3 px-8 py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-2xl tracking-wider rounded-xl shadow-lg hover:shadow-cyan-500/50 transition">
                    <Plus className="w-10 h-10" /> NEW COMMODITY
                </button>
            </div>

            <div className="panel overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/20 dark:bg-black/30">
                        <tr className="text-xl font-bold">
                            <th className="p-6">NAME</th>
                            <th className="p-6">CATEGORY</th>
                            <th className="p-6">QTY</th>
                            <th className="p-6">PRICE</th>
                            <th className="p-6">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id} className="border-t border-white/20 hover:bg-white/10 transition">
                                <td className="p-6 font-mono text-lg">{p.name}</td>
                                <td className="p-6">{p.category}</td>
                                <td className="p-6 font-bold">{p.quantity < 100 ? <span className="text-red-500">{p.quantity}</span> : p.quantity}</td>
                                <td className="p-6 font-mono">${p.price}</td>
                                <td className="p-6 flex gap-4">
                                    <button onClick={() => openModal(p)} className="p-3 hover:bg-white/20 rounded"><Edit2 /></button>
                                    <button onClick={() => deleteProduct(p.id)} className="p-3 hover:bg-red-500/30 rounded"><Trash2 /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
                    <div className="panel p-10 w-full max-w-2xl" onClick={e => e.stopPropagation()}>
                        <h2 className="text-4xl font-black mb-8">{editing ? "◈ EDIT NODE ◈" : "◈ DEPLOY COMMODITY ◈"}</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <input placeholder="NAME" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="text-2xl" />
                            <input placeholder="CATEGORY" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="text-2xl" />
                            <input type="number" placeholder="QUANTITY" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="text-2xl" />
                            <input type="number" placeholder="PRICE $" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="text-2xl" />
                        </div>
                        <div className="flex gap-6 mt-10">
                            <button onClick={saveProduct} className="flex-1 py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-3xl tracking-wider">
                                {editing ? "◈ UPDATE" : "◈ DEPLOY"}
                            </button>
                            <button onClick={() => setShowModal(false)} className="flex-1 py-5 bg-red-600 hover:bg-red-500 text-3xl font-black tracking-wider">
                                ▓ CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}