import './App.css';
import NavBar from './componenta/NavBar';
import React, { Component } from 'react'
import News from './componenta/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <News/>
      </div>
    )
  }
}


