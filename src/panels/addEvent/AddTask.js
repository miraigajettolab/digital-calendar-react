import React from "react"
import "./addTask.css"

import algoliasearch from "algoliasearch";
import CustomAutocomplete from "./Autocomplete/CustomAutocomplete";
import "algolia-react-autocomplete/build/css/index.css";

class AddTask extends React.Component {
    constructor(props) {
      super(props);
      console.log(this.props)


      this.client = algoliasearch(
        "3VHBZCM9SW",
        "994c56ac59e81a63af4aa7f3edb9511a" // search-only api key
      );
    this.indexes = [
        {
          source: this.client.initIndex("users"),
          displayKey: "fullName",
          templates: {
            header: () => <h2 className="aa-suggestions-category"> Пользователи</h2>
          }
        }
    ];

      this.state = { 
        assignedWorkers: [],
        currentSelection: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSearchChange = this.handleSearchChange.bind(this);
      this.handleWorkerAppend = this.handleWorkerAppend.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.addClick = this.addClick.bind(this);
      this.removeClick = this.removeClick.bind(this);
    }

    handleChange(event) { //calling  function
      const name = event.target.name
      const value = event.target.value
      this.props.onChange(this.props.id, name, value)
  }
    

  //

    createUI(){
       return this.props.assignedWorkers.map((el, i) => 
           <div className="workerRow" key={i}>
             <div className="workerColumn">
               <h3>{el||''}</h3>
                <input className="removeWorkerButton" type='button' value='x' onClick={this.removeClick.bind(this, i)}/>
              </div>
           </div>          
       )
    }

    handleWorkerAppend(){
      if(this.state.currentSelection && !this.props.assignedWorkers.includes(this.state.currentSelection)) {
        this.props.onSearchChange(this.props.id, this.state.currentSelection)
      }
    }
  
    handleSearchChange(event) { //calling external function
       let currentSelection = event.email
       this.setState({ currentSelection });
    }
    
    addClick(){ //calling external function
      this.props.onAddClick(this.props.id)
    }
    
    removeClick(i){ //calling external function
       console.log(this.props)
       this.props.onRemoveClick(this.props.id, i)
    }
  
    handleSubmit(event) {
      console.log(this.state)
      event.preventDefault();
    }
  
    render() {
      console.log(this.props.assignedWorkers)
      return (
        <div>
            <input 
              className = "taskTitle"
              type = "text"
              placeholder = "Заголовок задачи"
              name = "taskName"
              value = {this.props.taskName}
              onChange = {this.handleChange}
            />
            <textarea 
              className = "taskDescription"
              rows="4"
              cols="50"
              placeholder = "Описание задачи"
              name = "taskDescription"
              value = {this.props.taskDescription}
              onChange = {this.handleChange}
            />
            {this.createUI()}
            <CustomAutocomplete
                        indexes={this.indexes}
                        onSelectionChange={this.handleSearchChange.bind(this)}
                        >
                       <input 
                            onSubmit={e => { e.preventDefault()}}
                            key="input"
                            type="search"
                            id="aa-search-input"
                            className="aa-input-search"
                            placeholder={"Поиск исполнителей..."}
                            name="search"
                            autoComplete="off"
                            onChange={this.handleSearchChange.bind(this)}
                        />
                </CustomAutocomplete>        
            <input className="addWorkerButton" type='button' value='Добавить исполнителя' onClick={this.handleWorkerAppend.bind(this)}/>
        </div>
      );
    }
  }
  

export default AddTask 