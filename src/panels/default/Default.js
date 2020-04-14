import React from "react"
import "./default.css"
import * as firebase from "firebase"

class Default extends React.Component {
    constructor() {
        super()

        this.state = {
            user: ""
        }
        this.signOutHandler = this.signOutHandler.bind(this)
    }

    componentDidMount(){
        const firestore = firebase.firestore();
        const userRef = firestore.doc("users/"+ firebase.auth().currentUser.email)
        userRef.get().then((doc) => {
            if(doc && doc.exists){
                this.setState({user:doc.data()})
            }
        }).catch(e => console.log(e.message))
    }

    signOutHandler() {
        firebase.auth().signOut()
        this.props.activePanelHandler("SignIn")
    }


    render() {
        return (
            <div className="contentColumn">
                <div className="stubRow">
                    <h3>Авторизирован как: {this.state.user.fullName}, {this.state.user.title}</h3>
                    <button onClick={this.signOutHandler} className = "signOutButton">Выйти</button>
                    {console.log(this.state)}
                </div>
            </div>
        )
    }
} 

export default Default