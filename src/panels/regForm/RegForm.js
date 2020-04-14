import React from "react"
import "./regForm.css"
import * as firebase from "firebase"

class RegForm extends React.Component {
    constructor() {
        super()
            this.state = {
                lastName:"",
                firstName:"",
                patronym:"",
                email:"",
                password:"",
                repeatedPassword:"",
                isEventManager: false,
                token: "",
                title: ""
            }
            this.changeHandler = this.changeHandler.bind(this)
            this.signUpHandler = this.signUpHandler.bind(this)
        }
    
        changeHandler(event) {
            const name = event.target.name
            const value = event.target.value
            const type = event.target.type
            const checked = event.target.checked
            type === "checkbox" ? this.setState({[name]:checked}) : this.setState({[name]:value})
        }

        //TODO: refactor this method with better nested callbacks as current solution may cause problems
        signUpHandler() {
            const firestore = firebase.firestore();
            const docRef = firestore.doc("users/"+ this.state.email)

            const auth = firebase.auth();
            const promise = auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            promise
            .then(
                docRef.set({
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    patronym: this.state.patronym,
                    fullName: this.state.lastName + " " + this.state.firstName + " " + this.state.patronym,
                    title: this.state.title,
                    isEventManager: this.state.isEventManager})
                .then(
                    user => this.props.activePanelHandler("Default")
                )
                .catch(e => console.log(e.message))
            )
            .catch(e => console.log(e.message))          
        }

    render() {
        return (
            <div className="contentColumn">
                <div className="formRow">
                    <input 
                        className = "textField"
                        type = "text"
                        placeholder = "Фамилия"
                        name = "lastName"
                        value = {this.state.lastName}
                        onChange = {this.changeHandler}
                    />
                    <input 
                        className = "textField"
                        type = "text"
                        placeholder = "Имя"
                        name = "firstName"
                        value = {this.state.firstName}
                        onChange = {this.changeHandler}
                    />
                    <input 
                        className = "textField"
                        type = "text"
                        placeholder = "Отчество"
                        name = "patronym"
                        value = {this.state.patronym}
                        onChange = {this.changeHandler}
                    />
                    <input 
                        className = "textField"
                        type = "text"
                        placeholder = "Должность"
                        name = "title"
                        value = {this.state.title}
                        onChange = {this.changeHandler}
                    />
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
                        placeholder = "Пароль"
                        name = "password"
                        value = {this.state.password}
                        onChange = {this.changeHandler}
                    />
                    <input 
                        className = "textField"
                        type = "password"
                        placeholder = "Пароль ещё раз"
                        name = "repeatedPassword"
                        value = {this.state.repeatedPassword}
                        onChange = {this.changeHandler}
                    />
                    <label className="switch">
                    <input
                        type="checkbox"
                        name="isEventManager"
                        onChange={this.changeHandler}
                        checked={this.state.isEventManager}
                    />
                    <span class="slider round"></span>
                    </label>
                    <label className="label">Event-менеджер?</label>
                    <input 
                        style = {{display: this.state.isEventManager ? "block":"none", marginTop: "1rem"}}
                        className = "textField"
                        type = "text"
                        placeholder = "Токен"
                        name = "token"
                        value = {this.state.token}
                        onChange = {this.changeHandler}
                    />
                    <button onClick={this.signUpHandler} className = "signUpButton">Зарегистрироватся</button>            
                </div>
            </div>
        )
    }
    
}

export default RegForm