import { create } from "zustand"
import { User } from "./authStore"
import { axiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { createJSONStorage, persist } from "zustand/middleware"

type Post = {
    id: number
    title: string
    content: string
    subtitle?: string
    created_at: string
    user_id: number
    author: User
    total_likes: number
}

type PostStore = {
    post: Post | null
    liked: boolean
    total_likes: number
    posts: Post[]
    isCreatingPost: boolean
    isUpdatingLikes: boolean
    updateLikes: ({ post_id }: { post_id: number }) => Promise<void>
    isFetchingPosts: boolean
    isFetchingSinglePost: boolean
    createPost: (data: { title: string, content: string }) => Promise<Post | null>
    fetchPosts: () => Promise<void>
    fetchSinglePost: ({ post_id }: { post_id: number }) => Promise<void>
}

export const usePostStore = create<PostStore>()(persist(
    (set) => ({
        post: null,
        posts: [],
        total_likes: 0,
        isCreatingPost: false,
        isFetchingPosts: false,
        isFetchingSinglePost: false,
        isUpdatingLikes: false,
        liked: false,
        createPost: async (data: { title: string; content: string }) => {
            set({ isCreatingPost: true })
            try {
                const res = await axiosInstance.post("/post/create-post", data)
                toast.success("Post created successfully")
                return res.data
            } catch (err: unknown) {
                const error = err as AxiosError<any>
                if (error.response) {
                    toast.error(error.response.data.error)
                } else {
                    toast.error("Network error")
                }
                toast.error("error creating post")
                return null;
            } finally {
                set({ isCreatingPost: false })
            }
        },
        fetchPosts: async () => {
            set({ isFetchingPosts: true })
            try {
                const res = await axiosInstance.get("/post/get-posts")
                set({ posts: res.data.posts })
            } catch (error: any) {
                if (error.response) {
                    console.log(error.response.data)
                    toast.error(error.response.data.error)
                } else {
                    console.log(error.message)
                    toast.error("Network error")
                }
                toast.error("Cannot load posts")
            } finally {
                set({ isFetchingPosts: false })
            }
        },
        fetchSinglePost: async ({ post_id }: { post_id: number }) => {
            set({ isFetchingSinglePost: true })
            try {
                const res = await axiosInstance.get(`/post/${post_id}`)
                set({ post: res.data.post, total_likes: res.data.total_likes, liked: res.data.liked })
            } catch (err: unknown) {
                const error = err as AxiosError<any>
                if (error.response) {
                    toast.error(error.response.data.error)
                } else {
                    toast.error("network error")
                }
                set({ post: null })
            } finally {
                set({ isFetchingSinglePost: false })
            }
        },
        updateLikes: async ({ post_id }: { post_id: number }) => {
            set({ isUpdatingLikes: true })
            try {
                const res = await axiosInstance.post(`/post/update-like/${post_id}`)
                set({ total_likes: res.data.total_likes, liked: res.data.liked })
            } catch (err: unknown) {
                const error = err as AxiosError<any>
                if (error.response) {
                    toast.error(error.response.data.error || "Something went wrong")
                } else {
                    toast.error("Network error")
                }
            } finally {
                set({ isUpdatingLikes: false })
            }
        }
    }), {
    name: 'like-storage',
    storage: createJSONStorage(() => localStorage)
}))
