import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({loginHandler}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      console.log(result.data)
      localStorage.setItem('blogs-user-token', token)
      loginHandler(token)
    }  
  }, [result.data])


  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (<>
    <h2> log in to application</h2>
    <form onSubmit={submit}>
      <div>
        <label>
            username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
            password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  </>
  )
}

export default LoginForm