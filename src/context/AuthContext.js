import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 1. Verifica se o usuário ainda está logado (cookie JWT)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/me", {
          method: "GET",
          credentials: "include", // Importante para enviar os cookies
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Erro ao verificar autenticação:", err);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 🔹 2. Login: a API já define o cookie JWT
  const loginUser = async (credentials) => {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // envia e recebe cookies
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Falha no login");
    }

    const data = await response.json();
    setUser(data.user);
    setIsAuthenticated(true);
  };

  // 🔹 3. Logout: apaga o cookie no servidor
  const logoutUser = async () => {
    await fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loginUser,
    logoutUser,
    isAuthenticated,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
