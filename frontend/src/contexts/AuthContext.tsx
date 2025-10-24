import React, {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

interface AuthContextType {
    isAuthValue: string;
    setIsAuthValue: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthValue, setIsAuthValue] = useState("");

    const value: AuthContextType = {
        setIsAuthValue,
        isAuthValue,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};
