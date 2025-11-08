import {createContext, useState , useContext} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user , setUser ] = useState(null);

    const loginUser = (userData) => {
        setUser(userData);
    }
    const logoutUser = () => {
        setUser(null)
    }

   const value = {
    user,
    loginUser,
    logoutUser,
    isAthenticated: !!user,
   };

   return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
   )
};

export const useAuthContext = () => {
    return useContext(AuthContext)
}