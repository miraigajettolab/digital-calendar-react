import React from "react"
import "./navbar.css"
import * as firebase from "firebase"

class TopNavBar extends React.Component {
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
            <div class="topnav">
              <a> <button onClick={this.signOutHandler} className = "signOutButton">Выйти</button> </a>
              {this.state.user && <a> {this.state.user.fullName}, {this.state.user.title} </a>}
            </div>
        )
    }
}

export default TopNavBar
