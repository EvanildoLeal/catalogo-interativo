import { configureStore, createSlice } from '@reduxjs/toolkit';

// 1. Fatia do Usuário (Gerencia o estado de autenticação)
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

// 2. Fatia dos Produtos (Gerencia a lista de itens)
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

// EXPORTAÇÃO DAS AÇÕES
// Isso permite que você use: dispatch(login(dados)) nas outras telas
export const { login, logout } = userSlice.actions;
export const { setProducts, setLoading, setError } = productsSlice.actions;

// 3. CONFIGURAÇÃO DA LOJA (STORE)
// O export default aqui facilita o import no App.js
export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        products: productsSlice.reducer,
    },
});

export default store;