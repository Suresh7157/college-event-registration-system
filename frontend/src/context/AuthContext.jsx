import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const fullName = localStorage.getItem("name");
        const email = localStorage.getItem("email");

        if (token) {

            setUser({
                token,
                role,
                fullName,
                email
            });

        }

        setLoading(false);

    }, []);

    const login = (data) => {

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.fullName);
        localStorage.setItem("email", data.email);

        setUser(data);

    };

    const logout = () => {

        localStorage.clear();

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);