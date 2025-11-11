import {createContext, useState , useContext} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [user , setUser ] = useState(null);

     const loginUser = (data) => {
    localStorage.setItem("token", data.token); // precisa ter token retornando da API
    setUser(data.user);
    setIsAuthenticated(true);
  };
    const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

    

   const value = {
    user,
    loginUser,
    logoutUser,
    isAthenticated: !!user,
   };

   return (
    <AuthContext.Provider value={{ isAuthenticated, user, value, loginUser, logoutUser }}>
        {children}
    </AuthContext.Provider>
   )
};

export const useAuthContext = () => {
    return useContext(AuthContext)
}