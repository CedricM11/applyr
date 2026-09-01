import { create } from "zustand";
import type { User } from "../types/user";
import { getMe, logout as logoutApi } from "../api/authApi";

interface AuthState {
	user: User | null;
	isLoading: boolean;
	initAuth: () => Promise<void>;
	setUser: (user: User) => void;
	clearUser: () => void;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,

	isLoading: true,

	initAuth: async () => {
		try {
			const user = await getMe();
			set({ user, isLoading: false });
		} catch (error) {
			set({ user: null, isLoading: false });
		}
	},

	setUser: (user) => {
		set({ user })
	},

	clearUser: () => { 
		set({ user: null})
	},

	logout: async () => {
		try {
			await logoutApi();
		} finally {
			set({ user: null });
		}
	}
}));