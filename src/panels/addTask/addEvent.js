import React from "react"
import "./addTask.css"
import AddTask from "./AddTask"
import { fireEvent } from "@testing-library/react";
import update from 'react-addons-update';

class AddEvent extends React.Component {
    constructor(props) {
      super(props);

      this.state = { 
        tasks: [],
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.changeHandler = this.changeHandler.bind(this);
      this.handleTaskChange = this.handleTaskChange.bind(this);
      this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    changeHandler(event) {
      const name = event.target.name
      const value = event.target.value
      this.setState({[name]:value})
    }

    handleTaskChange(taskId, name, value){
        this.setState(update(this.state, {
            tasks: {
                [taskId]: {
                    $set: {}
                }
            }
        }));
    }

    handleSearchChange(taskId, i, event){
       let field = "this.state.tasks[" + taskId + "].assignedWorkers";
       let assignedWorkers = [...field]
       assignedWorkers[i] = event.email
       this.setState(prevState => {
           let field = "this.state.tasks[" + taskId + "].assignedWorkers"
            return {[field]:assignedWorkers}
        })
    }


    
    createUI(){
       return this.state.tasks.map((el, i) => 
           <div key={i}>
            <AddTask
               key={i}
               id={i}
               onChange={this.handleTaskChange}
               onSearchChange={this.handleSearchChange}
               value={this.state[i]}/>
              <p>{el||''}</p>
              <input type='button' value='убрать подзадачу' onClick={this.removeClick.bind(this, i)}/>
           </div>          
       )
    }
  
    handleChange(i, event) {
       let tasks = [...this.state.tasks];
       tasks[i] = event.email
       this.setState({ tasks });
    }
    
    addClick(){
      this.setState(prevState => ({ tasks: [...prevState.tasks, '']}))
    }
    
    removeClick(i){
       let tasks = [...this.state.tasks];
       tasks.splice(i,1);
       this.setState({ tasks });
    }
  
    handleSubmit(event) {
      console.log(this.state)
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>

            {this.createUI()}        
            <input type='button' value='Добавить подзадачу' onClick={this.addClick.bind(this)}/>
            <input type="submit" value="Сохранить" />
        </form>
      );
    }
  }
  

export default AddEvent