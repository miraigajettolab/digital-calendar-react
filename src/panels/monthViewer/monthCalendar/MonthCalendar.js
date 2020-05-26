/* global _ */
import React from "react"
//import "../month1.css"

class MonthCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          };
    }

    daysInMonth() { 
        return new Date(this.props.year, this.props.month, 0).getDate(); 
    } 

    render() {
        let firstDay = new Date(this.props.month+" 1 "+this.props.year);
        console.log(firstDay.getDay())
        let blanks = [];
        let numBlanks = firstDay.getDay() == 0 ? 6 : firstDay.getDay()-1;
        for (let i = 0; i < numBlanks; ++i) {
            blanks.push(<div className="number"></div>)
        }
        let days = [];
        for (let i = 0; i < this.daysInMonth(); ++i ){
        days.push(<div className="number">{i+1}</div>);
        }
        return (
            <div className="monthcalendar">
            <div className="date">
              <div className="day">П</div>
              <div className="day">В</div>
              <div className="day">С</div>
              <div className="day">Ч</div>
              <div className="day">П</div>
              <div className="day">С</div>
              <div className="day">В</div>
              {blanks}
              {days}
            </div>
          </div>
        );
    }

}

export default MonthCalendar