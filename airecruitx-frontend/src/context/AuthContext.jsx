import {
    createContext,
    useContext,
    useState
} from "react";

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const getUserFromToken = (token) => {

    if (!token) {
        return null;
    }

    try {

        const decoded = jwtDecode(token);

        return {
            ...decoded,
            role: decoded.role?.replace(
                "ROLE_",
                ""
            )
        };

    } catch (error) {

        console.error(
            "Invalid JWT:",
            error
        );

        return null;
    }
};

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState(() =>
        getUserFromToken(
            localStorage.getItem("token")
        )
    );

    const login = (jwtToken) => {

        localStorage.setItem(
            "token",
            jwtToken
        );

        setToken(jwtToken);

        const decodedUser =
            getUserFromToken(jwtToken);

        setUser(decodedUser);
    };

    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};