const LoginForm = ({ username, password, loginHandler, usernameChange, passwordChange }) => {

  return (<>
    <h2> log in to application</h2>
    <form onSubmit={loginHandler}>
      <div>
        <label>
            username
          <input
            type="text"
            value={username}
            onChange={usernameChange}
          />
        </label>
      </div>
      <div>
        <label>
            password
          <input
            type="password"
            value={password}
            onChange={passwordChange}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  </>
  )
}

export default LoginForm