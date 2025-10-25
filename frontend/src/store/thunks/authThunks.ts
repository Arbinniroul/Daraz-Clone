import type { Address, LoginCredentials, RegisterCredentials } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/authService";

export const registerUser = createAsyncThunk(
    "/auth/register",
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
    "/auth/login",
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(credentials);
            return response;
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message);
        }
    }
);
export const addAddress=createAsyncThunk(
    'auth/add/address',
    async ({token,address}:{token:string,address:Address},  { rejectWithValue }) => {
        try {
            const response = await AuthService.addAddress(token,address);
            return response;
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message);
        }
    }
);

