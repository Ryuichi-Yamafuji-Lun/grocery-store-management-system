import { useState } from 'react'

const LoginForm = () => {
  const [popupStyle, showPopup] = useState("hide")

  const popup = () => {
    showPopup("login-popup")
    setTimeout(() => showPopup("hide"), 3000)
  }

  return (
    <div className="login-page">
        <h1>Login</h1>
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>

        <div className="login-btn" onClick={popup}>Login</div>

        <p className="text">Or login using</p>

        <div className="alt-login">
            <div className="facebook"></div>
            <div className="google"></div>
        </div>

        <div className={popupStyle}>
          <h3>Login Failed</h3>
          <p>Username or Password is Incorrect</p>
        </div>
    </div>
  )
}

export default LoginForm