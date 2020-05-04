import React from "react"
import "./addTask.css"
import AddTask from "./AddTask"


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
      this.taskAddClick = this.taskAddClick.bind(this);
      this.taskRemoveClick = this.taskRemoveClick(this);
    }

    changeHandler(event) {
      const name = event.target.name
      const value = event.target.value
      this.setState({[name]:value})
    }


    //external functions for AddTask
    handleTaskChange(taskId, name, value){
      let a = this.state.tasks.slice(); //creates the clone of the state
      let obj = a[taskId];
      if(obj) {
        obj[name] = value
      }
      else  {
        obj = {}
        obj[name] = value
      }
      a[taskId] = obj;
      this.setState({"tasks": a});
    }

    handleSearchChange(taskId, i, event){
      let a = this.state.tasks.slice(); //creates the clone of the state
      let obj = a[taskId];
      if(!obj) {
        obj = {}
      
      }
      if(!obj.assignedWorkers){
        obj.assignedWorkers = [];
      }


       let assignedWorkers = [...obj.assignedWorkers];
       assignedWorkers[i] = event.email
       obj.assignedWorkers = assignedWorkers

       a[taskId] = obj;
       this.setState({"tasks": a});
    }
    taskAddClick(taskId){
      console.log("adding stuff")
      let a = this.state.tasks.slice(); //creates the clone of the state
      let obj = a[taskId];
      if(!obj) {
        obj = {}
      
      }
      if(!obj.assignedWorkers){
        obj.assignedWorkers = [];
      }
      obj.assignedWorkers = [...obj.assignedWorkers, '']

      a[taskId] = obj;
      this.setState({"tasks": a});
    }
    
    taskRemoveClick(taskId, i){
      console.log("removing stuff")
      let a = this.state.tasks.slice(); //creates the clone of the state
      let obj = a[taskId];
      if(!obj) {
        obj = {}
      
      }
      if(!obj.assignedWorkers){
        obj.assignedWorkers = [];
      }
       let assignedWorkers = [...obj.assignedWorkers];
       assignedWorkers.splice(i,1);
       obj.assignedWorkers = assignedWorkers

       a[taskId] = obj;
       this.setState({"tasks": a});
    }
  


    
    createUI(){
      let a = []
       return this.state.tasks.map((el, i) => 
           <div key={i}>
            <AddTask
               key={i}
               id={i}
               onChange={this.handleTaskChange}
               onSearchChange={this.handleSearchChange}
               onAddClick={this.taskAddClick}
               onRemoveClick={this.taskRemoveClick}
               taskName={this.state.tasks[i].taskName}
               taskDescription={this.state.tasks[i].taskDescription}
               assignedWorkers={this.state.tasks[i].assignedWorkers? this.state.tasks[i].assignedWorkers : a}/>
              <input className="addTaskButton" type='button' value='убрать задачу' onClick={this.removeClick.bind(this, i)}/>
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
             <input 
              className = "eventTitle"
              type = "text"
              placeholder = "Заголовок события"
              name = "taskName"
              value = {this.props.taskName}
              onChange = {this.handleChange}
            />
            <textarea 
              className = "eventDescription"
              rows="4"
              cols="50"
              placeholder = "Описание события"
              name = "taskDescription"
              value = {this.props.taskDescription}
              onChange = {this.handleChange}
            />
            {this.createUI()}        
            <input className="removeTaskButton" type='button' value='Добавить задачу' onClick={this.addClick.bind(this)}/>
            <input className="submitButton" type="submit" value="Сохранить" />
        </form>
      );
    }
  }
  

export default AddEvent