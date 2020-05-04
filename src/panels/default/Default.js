import React from "react"
import "./default.css"
import TopNavBar from './navbar.js';
import AddEvent from "../addEvent/addEvent"


class Default extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          };
    }
    render() {
    return (
      <nav>
          <TopNavBar activePanelHandler = {this.props.activePanelHandler}/>
            <div className="contentColumn">
              <div className="stubRow">
                    <AddEvent/>
              </div>
            </div>
          </nav>
        )
    }
}

export default Default
