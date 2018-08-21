import React, { Component } from 'react'
import Avatar from './Avatar';
import axios from 'axios';

class App extends Component {
  //es stage-3 class properties
  state = { 
    loaded: false, 
    students: [], 
    left: null, 
    right: null, 
    winner: null,
  }

  //React.Component function
  componentDidMount() {
    axios.get('https://canvas-students.herokuapp.com/api/student_list/60')
      .then( res => { 
        const [ left, right, ...students ] = res
        this.setState({ students, left, right, loaded: true }) 
      })
  }

  sample = (arr) => {
    const index = Math.floor(Math.random() * arr.length)
    return arr[index]
  }

  selectStudents = () => {
    const { students } = this.state
    const left = this.sample(students)
    const remaining = students.filter( s => s.name !== left.name )
    const right = this.sample(remaining)
    this.setState({
      students: remaining.filter( s => s.name !== right.name ),
      left,
      right,
    })
  }

  handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    this.setState
  }

  winner = (position) => {
    let fighter = this.state[position]
    if (this.state.students.length === 0) {
      this.setState({ left: fighter, right: fighter })
    } else {
      this.setState({ 
        students: [...this.state.students, fighter],
        winner: fighter.name
      }, () => {
        if (this.state.students.length > 1)
          this.selectStudents()
      })
    }
  }

  render() {
    let { students, loaded, left, right, winner } = this.state;
    let fightClass = loaded ? "left fight-box" : "";
    let renderAvatar = false;

    if ( left && right )
      renderAvatar = true

    return (
      <div>
        <h1>Student Fights</h1>
        <div id="loading_zone" className="left">
          { !loaded && <label>Load Students</label> }
          <ul id="students">
            { students.map( (student, i) => <li key={i}>{student.name}</li> )}
          </ul>
        </div>
        <div id="fight_zone" className="left">
          <div id="left" className={fightClass} onClick={() => this.winner('left')}>
            { renderAvatar && <Avatar {...left} /> }
          </div>
          <div id="right" className={fightClass} onClick={() => this.winner('right')}>
            { renderAvatar && <Avatar {...right} /> }
          </div>
        </div>
        <h2 id="winner" className="green center">{ winner ? `Winner: ${winner}` : ''}</h2>
      </div>
    )
  }

}

export default connect()(App)
