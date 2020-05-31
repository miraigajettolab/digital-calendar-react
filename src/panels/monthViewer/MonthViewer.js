/* global _ */
import React from "react"
import "./month1.css"
import MonthCalendar from "./monthCalendar/MonthCalendar"
import arrowImg from "./arrow.png"
import plusImg from "./plus.png"
import * as firebase from "firebase"

class MonthViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            monthName : [
                {en: "January", rus: "Январь" },
                {en: "February", rus: "Февраль" },
                {en: "March", rus: "Март" },
                {en: "April", rus: "Апрель" },
                {en: "May", rus: "Май" },
                {en: "June", rus: "Июнь" },
                {en: "July", rus: "Июль" },
                {en: "August", rus: "Август" },
                {en: "Septemper", rus: "Сентябрь" },
                {en: "October", rus: "Октябрь" },
                {en: "November", rus: "Ноябрь" },
                {en: "December", rus: "Декабрь" }
            ],
            month:6, //change to current!!!!!!!!!np
            year:2020, //change to current!!!!!!!!!
            tasksList: ""
        };
        this.prevarrowHandler = this.prevarrowHandler.bind(this)
        this.nextarrowHandler = this.nextarrowHandler.bind(this)
    }

    componentDidMount() {
        let tasks = [];
        let userdata;

        const firestore = firebase.firestore();
        const authUser = firebase.auth().currentUser;
        if(authUser){
            const userRef = firestore.doc("users/"+ authUser.email)
            userRef.get().then((doc) => {
                if(doc && doc.exists){
                    this.setState({user:doc.data()})
                }
            }).then( () => {
                const docRef = firestore.collection("user_tasks").doc(this.state.user.email)
                docRef.get().then(function(doc) { //getting user tasks
                    if (doc.exists) {
                        userdata = doc.data();
                        console.log(userdata);
                    } else {
                        console.log("No such document!");
                    }
                }).then(() => {
                    for (let i = 0; i < userdata.tasks.length; ++i ){
                        let taskDate = userdata.tasks[i].taskDate.substring(8, 10)+"."+userdata.tasks[i].taskDate.substring(5, 7)
                        tasks.push(<li>{taskDate + " " + userdata.tasks[i].taskName}</li>);
                    }
                    this.setState({tasksList:tasks})
                    console.log(tasks);
                })
            }).catch(e => console.log(e.message))
        }

    }

    prevarrowHandler() {
        this.setState((prevState) => {
            let newMonth = prevState.month == 1 ? 12 : prevState.month - 1;
            let newYear = prevState.month == 1 ? prevState.year - 1 : prevState.year;
            return {month: newMonth, year: newYear};
        })
    }

    nextarrowHandler() {
        this.setState((prevState) => {
            let newMonth = prevState.month % 12 + 1;
            let newYear = prevState.month == 12 ? prevState.year + 1 : prevState.year;
            return {month: newMonth, year: newYear};
        })
    }

    render() {
        return(
            <div>
            <div className="monthname">{this.state.monthName[this.state.month-1].rus}</div>
            <div className="nextarrow" onClick={this.nextarrowHandler}>
                  <img src={arrowImg} width="50" height="50 "alt="next"/>
            </div>
            <div className="prevarrow" onClick={this.prevarrowHandler}>
                  <img src={arrowImg} width="50" height="50 "alt="previous"/>
            </div>
            <div className="left">
            <div className="monthname" style={{marginBottom: "20px", marginTop: "100px"}}>{this.state.year}</div> 
                <MonthCalendar 
                    year = {this.state.year}
                    month = {this.state.month}
                />
            </div>
            <div className="right">
              <div className="eventslist">
                <ul style={{listStyle: "none"}}>
                  {this.state.tasksList}
                </ul>
              </div>
            </div>
          </div>
        )
    }
}

export default MonthViewer