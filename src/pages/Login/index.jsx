import './style.css'
import Lixeira from '../../assets/lixeira.svg'
function Home() {

  const users = [
    {
      id: 'fmsdkmfaksdm',
      name: 'Rodolfo',
      age: 33,
      email: 'rod@email.com',
    }, {
      id: 'fmsdkmfrasdm',
      name: 'Aline',
      age: 28,
      email: 'Aline@email.com',
    }
  ]


  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuário</h1>
        <input placeholder='Nome' name='nome' type='text' />
        <input placeholder='Idade' name='idade' type='number' />
        <input placeholder='E-mail' name='email' type='email' />
        <button type='button'> Cadastrar</button>
      </form>

      {users.map((user) => (

        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade:<span>{user.age}</span> </p>
            <p>Email:<span>{user.email}</span> </p>
          </div>
          <button>
            <img src={Lixeira} />
          </button>
        </div>

      ))}


    </div>

  )
}

export default Home
