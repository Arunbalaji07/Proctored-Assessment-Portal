import axios from 'axios'

// Function to get token based on user role
const getTokenByRole = (role: string) => {
    switch(role) {
        case 'admin':
            return localStorage.getItem('admin');
        case 'student':
            return localStorage.getItem('student');
        case 'educator':
            return localStorage.getItem('educator');
        default:
            return null; // Handle cases where the role is not defined
    }
};

// Create axios instance
const baseApi = (role : string) => axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getTokenByRole(role)}` // Set Bearer token based on role
    }
});

export const adminApi = baseApi('admin')
export const educatorApi = baseApi('educator')
export const studentApi = baseApi('student')
