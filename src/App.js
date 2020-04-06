import React from "react"
import SignIn from "./panels/signIn/SignIn"
import "./global.css"

class App extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
        <div>
            <SignIn />
        </div>)
    }

}

export default App