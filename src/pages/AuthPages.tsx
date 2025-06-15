// src/pages/AuthPage.tsx
import React, { useState } from 'react';

export const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = isLogin ? '/login' : '/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro desconhecido');
      }

      setMessage(isLogin ? 'Login realizado com sucesso!' : 'Cadastro realizado com sucesso!');
      
      if (isLogin) {
        localStorage.setItem('token', data.token); // Salva token no login
      }

    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{ marginTop: 10, width: '100%', padding: 8, background: 'transparent', border: 'none', color: 'blue' }}
      >
        {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
      </button>

      {message && <p style={{ marginTop: 15 }}>{message}</p>}
    </div>
  );
};

export default AuthPage
