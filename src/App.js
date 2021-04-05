import React, { Component } from 'react';
import Navbar from './components/Navbar';
import AccessForm from './components/AccessForm';
import Particles from 'react-particles-js';
import Alert from './components/Alert';
import './App.css';

const particlesOptions = {
  particles: {
    line_linked: {
      color: {
        value: '#000'
      },
    },
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  state = {
    alert: null
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    
    setTimeout(() => {
			this.setState({ alert: null })
		}, 3000);
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions}/>
        <Navbar />
        <Alert alert={this.state.alert}/>
        <AccessForm setAlert={this.setAlert}/>
      </div>
    )
  }
}

export default App;
