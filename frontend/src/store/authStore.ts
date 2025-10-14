import { axiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import { create } from "zustand"

type user = {
    id: number,
    username: string,
    email: string,
    created_at: string
}

type authStore = {
    user: user | null
    isSigningUp: boolean
    isCheckingAuth: boolean
    checkAuth: () => void
    isSigningIn: boolean
    signup: (data: { username: string; email: string; password: string }) => Promise<boolean>
    signin: (data: { email: string, password: string }) => Promise<boolean>
}


export const useAuthStore = create<authStore>((set) => ({
    user: null,
    isSigningUp: false,
    isSigningIn: false,
    isCheckingAuth: false,
    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = await axiosInstance.get("/user/status")
            set({ user: res.data.user })
        } catch (error) {
            set({ user: null })
            console.log(error)
            toast.error("Errer checking auth.")
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    signup: async (data: { username: string; email: string; password: string }) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/user/signup", data)
            set({ user: res.data.user })
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
            const res = await axiosInstance.post("/user/signin", data)
            set({ user: res.data.user })
            return true;
        } catch (error: any) {
            if (error.response) {
                console.log("Backend error:", error.response.data.error);
                toast.error(error.response.data.error);
            } else {
                console.log("Network or CORS issue:", error.message);
                toast.error("Network error. Please try again.");
            }
            console.log(error)
            toast.error("Error signing up.")
            return false;
        } finally {
            set({ isSigningIn: false })
        }
    }
}))