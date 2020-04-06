import React from "react"
import "./stub.css"
import StubImg from "./stub.png"

class Stub extends React.Component {
    constructor() {
    super()
        this.state = {}
    }

    render() {
        return (
            <div className="contentColumn">
                <div className="stubRow">
                    <img className="stubPic" src={StubImg} alt="under development pic"/>
                    <button onClick={event => this.props.activePanelHandler("SignIn")} className = "stubButton">Буду Ждать</button>
                </div>
            </div>
        )
    }
} 

export default Stub