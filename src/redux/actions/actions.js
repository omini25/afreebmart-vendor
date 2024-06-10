import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../types.js';
import {toast} from "react-toastify";
import {server} from "../../server.js";

export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const removeFromCart = (product) => ({
    type: REMOVE_FROM_CART,
    payload: product,
});

export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

export const updateQuantity = (product, quantity) => ({
    type: UPDATE_QUANTITY,
    payload: { product, quantity },
});

export const signup = (name, email, password) => {
    return async (dispatch) => {
        dispatch({ type: SIGNUP_REQUEST });
        try {
            const response = await fetch(`${server}/vendor-register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.status >= 200 && response.status < 300) {
                throw new Error('Signup failed. Please try again.');
            }

            const data = await response.json();

            // Save user's details in Redux store
            dispatch({ type: SIGNUP_SUCCESS, payload: data });

            // Save user's details in localStorage
            localStorage.setItem('user', JSON.stringify(data));

            // Display the toast message here, after the signup request is successful
            toast.success('Signup successful!');
        } catch (error) {
            dispatch({ type: SIGNUP_FAILURE, payload: error.message });
            // Display the toast message here, if the signup request fails
            toast.error('Signup failed. Please try again.');
        }
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            const response = await fetch(`${server}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.status >= 200 && response.status < 300) {
                throw new Error('Login failed. Please try again.');
            }

            const data = await response.json();

            // Save user's details in Redux store
            dispatch({ type: LOGIN_SUCCESS, payload: data });

            // Save user's details in localStorage
            localStorage.setItem('user', JSON.stringify(data));

            // Display the toast message here, after the login request is successful
            toast.success('Login successful!');
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, payload: error.message });
            // Display the toast message here, if the login request fails
            toast.error('Login failed. Please try again.');
        }
    };
};

export const LOGOUT = 'LOGOUT';

export const logout = () => ({
    type: LOGOUT,
});