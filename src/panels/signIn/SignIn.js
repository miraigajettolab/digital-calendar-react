import React from "react"
import "./signIn.css"

class SignIn extends React.Component {
    constructor() {
    super()
        this.state = {
            email:"",
            password:""
        }
        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({[name]:value})
    }

    render() {
        return (
            <div className="contentColumn">
                <form className="formRow">
                    <input 
                        className = "textField"
                        type = "email"
                        placeholder = "email"
                        name = "email"
                        value = {this.state.email}
                        onChange = {this.changeHandler}
                    />
                    <input 
                        className = "textField"
                        type = "password"
                        placeholder = "пароль"
                        name = "password"
                        value = {this.state.password}
                        onChange = {this.changeHandler}
                    />    
                    <button className = "signInButton">Войти</button>
                    <button className = "forgotButton">Забыли пароль?</button>
                    <button className = "signUpButton">Зарегистрироватся</button>            
                </form>
            </div>
        )
    }
} 

export default SignIn