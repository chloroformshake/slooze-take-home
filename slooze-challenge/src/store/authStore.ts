import { create } from "zustand";

type Role = "Manager" | "Store Keeper" | null;

type AuthState = {
    token: string | null;
    role: Role;
    login: (token: string, role: Role) => void;
    logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
    token: null,
    role: null,
    login: (token, role) => set({ token, role }),
    logout: () => set({ token: null, role: null }),
}));