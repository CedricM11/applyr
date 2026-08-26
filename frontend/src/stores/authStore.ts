import { create } from "zustand";
import type { User } from "../types/user";
import { getMe } from "../api/authApi";

interface AuthState {
	user: User | null;
	isLoading: boolean;
	initAuth: () => Promise<void>;
	setUser: (user: User) => void;
	clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,

	isLoading: true,

	initAuth: async () => {
		try {
			const user = await getMe();
			set({ user });
			set({ isLoading: false });
		} catch (error) {
			set({ user: null });
			set({ isLoading: false });
		}
	},

	setUser: (user) => {
		set({ user })
	},

	clearUser: () => { 
		set({ user: null})
	},
}));