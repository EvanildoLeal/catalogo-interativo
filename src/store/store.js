import { configureStore, createSlice } from '@reduxjs/toolkit';

// 1. Fatia do Usuário (Login/Perfil)
const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userData: null
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
        },
    },
});

// 2. Fatia dos Produtos (Onde os dados da API serão salvos)
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        masculino: [],
        feminino: [],
        loading: false,
        error: null,
    },
    reducers: {
        setProducts: (state, action) => {
            const { genero, data } = action.payload;
            state[genero] = data;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

// Exportamos as AÇÕES (isso é o que o productService usa)
export const { login, logout } = userSlice.actions;
export const { setProducts, setLoading, setError } = productsSlice.actions;

// 3. Configuração da Loja (Store)
export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        products: productsSlice.reducer,
    },
});