import { axiosInstance } from "@/lib/axios"
import axios from "axios"
import toast from "react-hot-toast"
import { create } from "zustand"

export type User = {
    id: number,
    username: string,
    email: string,
    created_at: string
    avatar_url?: string
}

type authStore = {
    user: User | null
    isSigningUp: boolean
    isCheckingAuth: boolean
    checkAuth: () => Promise<void>
    isSigningIn: boolean
    signup: (data: { username: string; email: string; password: string }) => Promise<boolean>
    signin: (data: { email: string, password: string }) => Promise<boolean>
}


export const useAuthStore = create<authStore>((set) => ({
    user: null,
    isSigningUp: false,
    isSigningIn: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/user/status")
            set({ user: res.data.user })
        } catch (error) {
            set({ user: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    signup: async (data: { username: string; email: string; password: string }) => {
        set({ isSigningUp: true })
        try {
            await axiosInstance.post("/user/signup", data)
            await useAuthStore.getState().checkAuth()
            return true;
        } catch (error) {
            console.log(error)
            toast.error("Failed to create account.")
            return false;
        } finally {
            set({ isSigningUp: false })
        }
    },
    signin: async (data: { email: string; password: string }) => {
        set({ isSigningIn: true })
        try {
            await axiosInstance.post("/user/signin", data)
            await useAuthStore.getState().checkAuth()
            return true;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error ?? "Login failed");
            } else {
                toast.error("Unexpected error occurred");
            }
            return false;
        } finally {
            set({ isSigningIn: false })
        }
    }
}))