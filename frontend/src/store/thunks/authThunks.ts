import type {
    AddressForm,
    LoginCredentials,
    RegisterCredentials,
} from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/authService";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (credentials: RegisterCredentials, { rejectWithValue }) => {
        try {
            const response = await AuthService.register(credentials);
            return response;
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(credentials);
            return response;
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addAddress = createAsyncThunk(
    "auth/addAddress",
    async (address: AddressForm, { rejectWithValue }) => {
        try {
            const response = await AuthService.addAddress(address);
            console.log("addAddress response:", response);
            return response;
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const getAddresses = createAsyncThunk(
    "auth/getAddresses",
    async (userID: string, { rejectWithValue }) => {
        try {
            const response = await AuthService.getAddress(userID);
            console.log("getAddresses response:", response);
            return response;
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message);
        }
    }
);
