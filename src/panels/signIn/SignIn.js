import React from "react"
import "./signIn.css"
import * as firebase from "firebase"

class SignIn extends React.Component {
    constructor() {
    super()
        this.state = {
            email:"",
            password:""
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.signInHandler = this.signInHandler.bind(this)
    }

    changeHandler(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({[name]:value})
    }

    signInHandler() {
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        promise.catch(e => console.log(e.message))
    }

    render() {
        return (
            <div className="contentColumn">
                <div className="formRow">
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
                    <button onClick={this.signInHandler} className = "signInButton">Войти</button>
                    <button onClick={event => this.props.activePanelHandler("Stub")} className = "forgotButton">Забыли пароль?</button>
                    <button onClick={event => this.props.activePanelHandler("RegForm")} className = "signUpButton">Зарегистрироватся</button>            
                </div>
            </div>
        )
    }
} 

export default SignIn