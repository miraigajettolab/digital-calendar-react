import React from "react"
import "./addTask.css"

import algoliasearch from "algoliasearch";
import Autocomplete from "algolia-react-autocomplete";
import "algolia-react-autocomplete/build/css/index.css";

class AddTask extends React.Component {
    constructor(props) {
      super(props);

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
        taskName: "",
        taskDescription: "" 
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSearchChange = this.handleSearchChange.bind(this)
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      const name = event.target.name
      const value = event.target.value
      this.props.onChange(this.props.id, name, value)
  }
    
    createUI(){
       return this.state.assignedWorkers.map((el, i) => 
           <div key={i}>
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
              <p>{el||''}</p>
              <input type='button' value='убрать' onClick={this.removeClick.bind(this, i)}/>
           </div>          
       )
    }
  
    handleSearchChange(i, event) {
       //let assignedWorkers = [...this.state.assignedWorkers];
       //assignedWorkers[i] = event.email
       this.props.onSearchChange(this.props.id, i, event)
       //this.setState({ assignedWorkers });
    }
    
    addClick(){
      this.setState(prevState => ({ assignedWorkers: [...prevState.assignedWorkers, '']}))
    }
    
    removeClick(i){
       let assignedWorkers = [...this.state.assignedWorkers];
       assignedWorkers.splice(i,1);
       this.setState({ assignedWorkers });
    }
  
    handleSubmit(event) {
      console.log(this.state)
      event.preventDefault();
    }
  
    render() {
      return (
        <div>
            <input 
              className = "textField"
              type = "text"
              placeholder = "Заголовок задачи"
              name = "taskName"
              value = {this.props.taskName}
              onChange = {this.handleChange}
            />
            <textarea 
              className = "textArea"
              rows="4"
              cols="50"
              placeholder = "Заголовок задачи"
              name = "taskDescription"
              value = {this.props.taskDescription}
              onChange = {this.handleChange}
            />
            {this.createUI()}        
            <input type='button' value='Добавить исполнителя' onClick={this.addClick.bind(this)}/>
        </div>
      );
    }
  }
  

export default AddTask 