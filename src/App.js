import React from "react"
import SignIn from "./panels/signIn/SignIn"
import RegForm from "./panels/regForm/RegForm"
import Stub from "./panels/stub/Stub"
import Default from "./panels/default/Default"
import Loading from "./panels/loading/Loading"
import "./global.css"
import * as firebase from "firebase"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {activePanel: "Loading"}
        firebase.auth().onAuthStateChanged(function(user) {
            console.log(user)
            if (user) {
                this.setState({activePanel: "Default"})
            } else {
                this.setState({activePanel: "SignIn"})
            }
        }.bind(this))
        this.activePanelHandler = this.activePanelHandler.bind(this)
    }


    activePanelHandler(nextPanel) {
        this.setState({activePanel: nextPanel})
    }

    render() {
        switch (this.state.activePanel) {
            case "Loading":
                return <Loading />
            case "SignIn":
                return <SignIn activePanelHandler = {this.activePanelHandler}/>
            case "RegForm":
                return <RegForm activePanelHandler = {this.activePanelHandler}/>
            case "Stub":
                return <Stub activePanelHandler = {this.activePanelHandler}/>
            case "Default":
                return <Default activePanelHandler = {this.activePanelHandler}/>
            default:
        }
    }

}

export default App