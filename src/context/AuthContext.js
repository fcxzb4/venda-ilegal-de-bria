import {createContext, useState , useContext} from "react";

const AuthContext = createContext();

export const AuthProvider = ({Children}) => {
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
    isAthemticated: !!user,
   };

   return (
    <AuthContext.Provider value={value}>
        {Children}
    </AuthContext.Provider>
   )
};

export const useAuthContext = () => {
    return useContext(AuthContext)
}