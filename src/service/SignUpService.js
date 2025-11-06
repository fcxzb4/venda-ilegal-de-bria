// src/service/SignUpService.js

import { data } from "react-router-dom";

const API_URL = "http://localhost:3001";

export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

   localStorage.setItem("token", data.token);

   return data


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao registrar usuário");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}


export default registerUser;