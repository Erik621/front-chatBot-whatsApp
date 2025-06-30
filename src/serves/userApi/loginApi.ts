import axios from "axios";

export async function login(email: string, password: string): Promise<boolean> {
  try {
    const response = await axios.post(`http://localhost:3000/api/login`, {
      email,
      password,
    });

    // Exemplo: salvar o token retornado
    const token = response.data.token;
    localStorage.setItem('token', token);

    return true;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return false;
  }
}
