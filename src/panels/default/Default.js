import React from "react"
import "./default.css"
import * as firebase from "firebase"

class Default extends React.Component {
    constructor() {
    super()
        this.state = {}
        this.signOutHandler = this.signOutHandler.bind(this)
    }

    signOutHandler() {
        firebase.auth().signOut()
        this.props.activePanelHandler("SignIn")
    }

    render() {
        return (
            <div className="contentColumn">
                <div className="stubRow">
                    <h3>Авторизирован как {firebase.auth().currentUser.email}</h3>
                    <button onClick={this.signOutHandler} className = "signOutButton">Выйти</button>
                </div>
            </div>
        )
    }
} 

export default Default