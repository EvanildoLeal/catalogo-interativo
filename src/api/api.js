import axios from 'axios';

// Mantemos a sua base URL da DummyJSON
const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000,
});

// Adicionamos esta função para ser usada no ecrã de produtos
export const getProducts = async () => {
    try {
        // Na DummyJSON, o endpoint é /products
        const response = await api.get('/products');
        // A DummyJSON retorna um objeto { products: [...], total: ... }
        // Por isso retornamos response.data.products
        return response.data.products;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        throw error;
    }
};

export default api;