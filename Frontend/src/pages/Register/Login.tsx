import React from 'react'

const Login = () => {
  return (
    <div>
      <div className="login">
        <h1>Login</h1>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password"  placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  )
}

export default Login