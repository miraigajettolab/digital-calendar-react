/* global _ */
import React from "react"
import "./month1.css"
import MonthCalendar from "./monthCalendar/MonthCalendar"
import arrowImg from "./arrow.png"
import plusImg from "./plus.png"

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
            month:5, //change to current!!!!!!!!!
            year:2020 //change to current!!!!!!!!!
        };
        this.prevarrowHandler = this.prevarrowHandler.bind(this)
        this.nextarrowHandler = this.nextarrowHandler.bind(this)
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
                  <li>14.05 Молодежный форум труда</li>
                  <li>15.05 Ярмарка вакансий в институе психолоигии</li>
                  <li>14.05 Молодежный форум труда</li>
                  <li>15.05 Ярмарка вакансий в институе психолоигии</li>
                  <li>14.05 Молодежный форум труда</li>
                  <li>15.05 Ярмарка вакансий в институе психолоигии</li>
                  <li>14.05 Молодежный форум труда</li>
                  <li>15.05 Ярмарка вакансий в институе психолоигии</li>
                  <li>14.05 Молодежный форум труда</li>
                  <li>15.05 Ярмарка вакансий в институе психолоигии</li>
                </ul>
              </div>
            </div>
          </div>
        )
    }
}

export default MonthViewer