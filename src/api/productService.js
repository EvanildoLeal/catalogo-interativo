import { configureStore, createSlice } from '@reduxjs/toolkit';

// Fatia do usuário (Login)
const userSlice = createSlice({
    name: 'user',
    initialState: { isLoggedIn: false, userData: null },
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

// Fatia dos produtos
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

// Exportamos as ações para usar nas telas
export const { login, logout } = userSlice.actions;
export const { setProducts, setLoading, setError } = productsSlice.actions;

// Criamos a loja principal
export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        products: productsSlice.reducer,
    },
});