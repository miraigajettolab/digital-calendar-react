import React from "react"
import "./default.css"
import TopNavBar from './navbar.js';
import AddEvent from "../addEvent/addEvent"
import MonthViewer from "../monthViewer/MonthViewer"
import * as firebase from "firebase"


class Default extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user: ""
          };
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
      let addEventVar = <AddEvent/>;
      let monthViewerVar = <MonthViewer/>
    
    return (
      <nav>
          <TopNavBar activePanelHandler = {this.props.activePanelHandler}/>
            <div className="contentColumn">
              <div className="stubRow">
                {this.state.user.isEventManager?addEventVar:monthViewerVar}
              </div>
            </div>
      </nav>
        )
    }
}

export default Default
