import { useState } from "react";
import { registerUser } from "../service/SignUpService";
import { useAuthContext } from "../context/AuthContext";
import { authService } from "../service/SignUpService";

export const useRegisterLogic = () => {
  const { loginUser } = useAuthContext

  const [ isLoginMode, setIsloginmode ] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bd: "",
    password: "",
  });
  
  const [loading, setLoading ] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleMode = () => {
    setIsloginmode((prevMode) => !prevMode);
    setFormData({name:'', email: '', password:''});
    setError('');
  }


  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

try {
      if (isLoginMode) {
        const user = await authService.login(formData);
        loginUser(user);
      } else {
        const user = await authService.register(formData);
        loginUser(user);
      }
    } catch (err) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return { 
    isLoginMode,
    formData,
    loading,
    error, 
    success,
    toggleMode,
    handleChange, 
    handleSubmit,};
}
