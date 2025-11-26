import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "Manager" | "Store Keeper" | null;

type AuthState = {
    token: string | null;
    role: Role;
    login: (token: string, role: Role) => void;
    logout: () => void;
};

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            role: null,
            login: (token, role) => set({ token, role }),
            logout: () => set({ token: null, role: null }),
        }),
        {
            name: "slooze-auth", // key in localStorage
        }
    )
);