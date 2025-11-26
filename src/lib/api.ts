
let API_URL = "https://slooze-rust-backend.vercel.app/";

if (process.env.NODE_ENV === "development") {
    API_URL = "http://localhost:4000";
}

export const api = {
    getProducts: () => fetch(`${API_URL}/cfs-api`).then(r => r.json()),
    addProduct: (data: any) => fetch(`${API_URL}/cfs-api`, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }).then(r => r.json()),
    updateProduct: (id: number, data: any) => fetch(`${API_URL}/${id}/cfs-api`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }).then(r => r.json()),
    deleteProduct: (id: number) => fetch(`${API_URL}/${id}/cfs-api`, { method: "DELETE" })
};