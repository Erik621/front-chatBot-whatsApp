import './style.css'
//import Lixeira from '../../assets/lixeira.svg'
import { login } from '../../serves/userApi/user'
import { useState } from 'react'
import React from 'react'

function Home() {
  const [user, setUser] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  async function getLogin(): Promise<void> {
    const result = await login(user, password)
    console.log(user)
    console.log(password)
    if (result) {
      console.log("Usuário Válido")
    } else {
      console.log("Usuário Inválido")
    }
  }

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuário</h1>

        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
          placeholder='user'
          name='user'
          type='text'
        />

        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder='Password'
          name='password'
          type='password'
        />

        <button onClick={getLogin} type='button'>Login</button>
      </form>
    </div>
  )
}

export default Home
