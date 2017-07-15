import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import './App.css';

class App extends Component {
    constructor() {
      super();
      this.state = {
        projects: [],
        todos: []
      };
    }

    getTodos() {
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos',
        dataType: 'json',
        cache: false,
        success: (data) => {
          this.setState({todos: data}, ()=>{
            console.log(this.state);
          })
        },
        error: (xhr, status, err) => {
          console.log(err);
        }
      })
    }

    getProjects() {
      this.setState({projects: [
          {
            id: uuid.v4(),
            title: "Business Website",
            category: "Web Design"
          },
          {
            id: uuid.v4(),
            title: "Social App",
            category: "Mobile Development"
          },
          {
            id: uuid.v4(),
            title: "Ecommerce Shopping Cart",
            category: "Web Development"
          }      
      ]});
    }
  
    componentWillMount() {
      this.getProjects();
      this.getTodos();
    }

    componentDidMount() {
      this.getTodos();
    }

    handleAddProject(newProject) {
      let projects = this.state.projects;
      projects.push(newProject);
      this.setState({projects: projects});
    }

    handleDeleteProject(id) {
      let projects = this.state.projects;
      let index = projects.findIndex(x => x.id === id);
      projects.splice(index, 1);
      this.setState({projects: projects});
    }

    render() {
      return (
        <div className="App">
          <AddProject addProject={this.handleAddProject.bind(this)}/>
          <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
        </div>
      );
    } 
}

export default App;
