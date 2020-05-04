import React from "react"
import "./addTask.css"

import algoliasearch from "algoliasearch";
import Autocomplete from "algolia-react-autocomplete";
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
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSearchChange = this.handleSearchChange.bind(this)
      this.handleChange = this.handleChange.bind(this);
      this.addClick = this.addClick.bind(this);
      this.removeClick = this.removeClick.bind(this);
    }

    handleChange(event) { //calling  function
      const name = event.target.name
      const value = event.target.value
      this.props.onChange(this.props.id, name, value)
  }
    
    createUI(){
       return this.props.assignedWorkers.map((el, i) => 
           <div className="autocompleteRow" key={i}>
             <div className="autocomleteColumn">
             <Autocomplete
                        indexes={this.indexes}
                        onSelectionChange={this.handleSearchChange.bind(this, i)}
                        >
                    
                       <input 
                            onSubmit={e => { e.preventDefault()}}
                            key="input"
                            type="search"
                            id="aa-search-input"
                            className="aa-input-search"
                            placeholder={el||"Поиск исполнителей..."}
                            name="search"
                            autoComplete="off"
                            onChange={this.handleSearchChange.bind(this, i)}
                        />
                </Autocomplete>
              </div>
              <div className="autocomleteColumn">
                <input className="removeWorkerButton" type='button' value='x' onClick={this.removeClick.bind(this, i)}/>
              </div>
              <p>{el||''}</p>
           </div>          
       )
    }
  
    handleSearchChange(i, event) { //calling external function
       //let assignedWorkers = [...this.state.assignedWorkers];
       //assignedWorkers[i] = event.email
       this.props.onSearchChange(this.props.id, i, event)
       //this.setState({ assignedWorkers });
    }
    
    addClick(){ //calling external function
      //this.setState(prevState => ({ assignedWorkers: [...prevState.assignedWorkers, '']}))
      this.props.onAddClick(this.props.id)
    }
    
    removeClick(i){ //calling external function
       //let assignedWorkers = [...this.state.assignedWorkers];
       //assignedWorkers.splice(i,1);
       //this.setState({ assignedWorkers });
       console.log(this.props)
       this.props.onRemoveClick(this.props.id, i)
    }
  
    handleSubmit(event) {
      console.log(this.state)
      event.preventDefault();
    }
  
    render() {
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
            <input className="addWorkerButton" type='button' value='Добавить исполнителя' onClick={this.addClick.bind(this)}/>
        </div>
      );
    }
  }
  

export default AddTask 