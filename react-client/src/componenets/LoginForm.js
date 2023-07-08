
const LoginForm = () => {
  return (
    <div className="login-page">
        <h1>Login</h1>
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>

        <input type="submit" className="login-btn">Login</input>

        <p className="text">Or login using</p>\

        <div className="alt-login">
            <div className="facebook"></div>
            <div className="google"></div>
        </div>
    </div>
  )
}

export default LoginForm