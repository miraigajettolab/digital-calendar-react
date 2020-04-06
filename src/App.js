import React from "react"
import SignIn from "./panels/signIn/SignIn"
import RegForm from "./panels/regForm/RegForm"
import Stub from "./panels/stub/Stub"
import "./global.css"

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            activePanel: "SignIn"
        }
        this.activePanelHandler = this.activePanelHandler.bind(this)
    }

    activePanelHandler(nextPanel) {
        this.setState({activePanel: nextPanel})
    }

    render() {
        switch (this.state.activePanel) {
            case "SignIn":
                return <SignIn activePanelHandler = {this.activePanelHandler}/>
            case "RegForm":
                return <RegForm activePanelHandler = {this.activePanelHandler}/>
            case "Stub":
                return <Stub activePanelHandler = {this.activePanelHandler}/>
            default:
        }
    }

}

export default App