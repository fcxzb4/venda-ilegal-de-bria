import { useState } from "react";
import { registerUser } from "../service/SignUpService";

export function useRegisterLogic() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bd: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const result = await registerUser(formData);
      setSuccess("Conta criada com sucesso!");
      console.log("Novo usuário:", result);
    } catch (err) {
      setError(err.message);
    }
  }

  return { formData, handleChange, handleSubmit, error, success };
}
