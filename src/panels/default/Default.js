import React from "react"
import "./default.css"
import AddEvent from "../addTask/addEvent"
import * as firebase from "firebase"

class Default extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: "",
            selection: null
          };

        this.signOutHandler = this.signOutHandler.bind(this)
    }

    signOutHandler() {
        firebase.auth().signOut()
        this.props.activePanelHandler("SignIn")
    }


    render() {
        const firestore = firebase.firestore();
        const authUser = firebase.auth().currentUser;
        if(authUser){
            const userRef = firestore.doc("users/"+ authUser.email)
            userRef.get().then((doc) => {
                if(doc && doc.exists){
                    this.setState({user:doc.data()})
                }
            }).catch(e => console.log(e.message))
        }

        return (
            <div className="contentColumn">
                <div className="stubRow">
                    {this.state.user && <h3>Авторизирован как: {this.state.user.fullName} - {this.state.user.title}</h3>}
                    <hr></hr>
                    <button onClick={this.signOutHandler} className = "signOutButton">Выйти</button>
                    <hr></hr>
                    <AddEvent/>
                </div>
            </div>
        )
    }
} 

export default Default 