import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    user: any; // Defina o tipo conforme necessário
    setUser: (user: any) => void; // Método para atualizar o usuário
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storedUser = localStorage.getItem('user');
    const initialUser = storedUser ? JSON.parse(storedUser) : null;

    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user)); // Atualiza o localStorage sempre que o usuário muda
        } else {
            localStorage.removeItem('user'); // Remove do localStorage se o usuário for null
        }
    }, [user]);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
