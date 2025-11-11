const API_BASE_URL = 'http://localhost:3001/auth';

const login = async ({ email, password }) => {  
  const apiPayload = {
    email,
    password,
  };

  try {
   const response = await fetch(`${API_BASE_URL}/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(apiPayload),
  credentials: 'include', // necessário para cookies
});

    if (!response.ok) {
      const errorData = await response.json();
      
      let errorMessage = 'Erro ao fazer login.';
      
      if (Array.isArray(errorData.message)) {
        errorMessage = errorData.message.join(', ');
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }

      throw new Error(errorMessage);
    }

    return await response.json();

  } catch (error) {
    console.error('Falha no authService.login:', error);
    throw error;
  }
};

const register = async (userData) => {
  const apiPayload = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(apiPayload),
  credentials: 'include', // IMPORTANTE
});

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = 'Erro ao registrar.';
      if (Array.isArray(errorData.message)) {
        errorMessage = errorData.message.join(', ');
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
      throw new Error(errorMessage);
    }

    return await response.json();

  } catch (error) {
    console.error('Falha no authService.register:', error);
    throw error;
  }
};

export const authService = {
  login,
  register,
};