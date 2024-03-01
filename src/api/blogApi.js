import { api } from "./api"

export const getAllBlogs = async () => {
    const response = await api.get('/blogs');
    
    return response.data;
}