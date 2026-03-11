import { configureStore, createSlice } from '@reduxjs/toolkit';

// Slice para o usuário
const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userData: null,
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

// Slice para produtos
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
            const { categoria, data } = action.payload;
            state[categoria] = data;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { login, logout } = userSlice.actions;
export const { setProducts, setLoading, setError } = productsSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        products: productsSlice.reducer,
    },
});