const API_URL = "http://localhost:4000";

export const api = {
    getProducts: () => fetch(`${API_URL}/products`).then(r => r.json()),
    addProduct: (data: any) => fetch(`${API_URL}/products`, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }).then(r => r.json()),
    updateProduct: (id: number, data: any) => fetch(`${API_URL}/products/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }).then(r => r.json()),
    deleteProduct: (id: number) => fetch(`${API_URL}/products/${id}`, { method: "DELETE" })
};