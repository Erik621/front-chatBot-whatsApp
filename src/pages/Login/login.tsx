import './login.css'
import { login } from '../../serves/userApi/user'
import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [erro, setErro] = useState<string>("")

  const navigate = useNavigate();

  async function getLogin(): Promise<void> {
    const result = await login(email, password)
    if (result) {
      navigate('/cadastro')
    } else {
      setErro("Usuário ou senha inválidos")
      setTimeout(() => setErro(""), 3000)
    }
  }

  return (
    <div className='container'>
      <form onSubmit={(e) => { e.preventDefault(); getLogin(); }}>
        <h1>Login de Usuário</h1>

        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          name='email'
          type='email'
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Senha'
          name='password'
          type='password'
        />

        <button type='submit'>Login</button>
      </form>

      {erro && <div className="mensagem-erro">{erro}</div>}
    </div>
  )
}

export default Login
