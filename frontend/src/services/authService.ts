import type {
    Address,
    AuthResponse,
    LoginCredentials,
    RegisterCredentials,
    User,
} from "@/types";

const API_BASE_URL = "http://localhost:3000/api/auth";

export class AuthService {
    static async register(
        credentials: RegisterCredentials
    ): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error(data.error || "Registration failed");
        }

        return data;
    }

    static async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }

        return data;
    }
    static async addAddress(
        token: string,
        address: Address
    ): Promise<{ message: string }> {
        const response = await fetch(`${API_BASE_URL}/add/address`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(address),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to add address");
        }

        return data;
    }
    static async getAddress(
        token: string,
        userId: string
    ): Promise<{ address: Address }> {
        const response = await fetch(`${API_BASE_URL}/get/address/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch address");
        }

        return data;
    }

    static async getProfile(token: string): Promise<{ user: User }> {
        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch profile");
        }

        return data;
    }
}
