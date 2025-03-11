import axios from 'axios';
import { create } from 'zustand';
import toast from 'react-hot-toast';

export const useauthStore = create((set) => ({
    user: null,
    isSignInUp: false,
    ischeckingAuth: true,
    isLoggingOut : false,
    islogginin : false,
    signUp: async (credentials) => {
        set({ isSignInUp: true });
        try {
            const response = await axios.post('/api/v1/auth/signup', credentials);
            set({ user: response.data.user, isSignInUp: false });
            toast.success('Account created successfully');
        } catch (error) {
            // Improved error handling
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            toast.error(errorMessage);
            set({ isSignInUp: false, user: null });
        }
    },
    login: async (credentials) => {
        set({ islogginin : true });
        try {
            const response = await axios.post('api/v1/auth/login', credentials);
            set({ user: response.data.user, islogginin : false });
            toast.success('Logged in successfully');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            toast.error(errorMessage);
            set({ islogginin : false, user: null });
            
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post('api/v1/auth/logout');
            toast.success("logged out successfully");
            set({ user: null, isLoggingOut: false });
        } catch (error) {
            set({ user: null, isLoggingOut: false });
            toast.error(error.Message);

            
        }
    },
    authcheck: async () => {
        set({ischeckingAuth:true})
        try {
           const response = await axios.get('/api/v1/auth/authcheck');
            set({ user: response.data.user, ischeckingAuth: false });
        } catch (error) {
            set({ischeckingAuth: false , user: null})
            
        }
    }
}));