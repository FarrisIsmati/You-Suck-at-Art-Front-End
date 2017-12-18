import React, { Component } from 'react'
import axios                from 'axios'
import Canvas                 from '../../SubComponents/Canvas/Canvas'

import                            '../../../Stylesheets/CommonStyles.css'
import                            './Game.css'

class Game extends Component {
  constructor(props){
    super(props)

    this.state = {
        started: false,
    }

    this.startGame = this.startGame.bind(this)
    this.getGameData = this.getGameData.bind(this)
  }

  getGameData() {
    axios.get(`http://localhost:3001/api/game/${this.props.match.params.gameId}`)
      .then((response) => {
          this.setState({...response.data})
        })
      .catch((err) => console.log(err))
  }

  startGame() {
    this.setState({
      started: true
    })
  }

  componentDidMount() {
    this.getGameData()
  }

  componentDidUpdate() {

  }

  render () {
    return (
      <div className='game-holder flex flex-column'>


        {this.state.started ?
          <Canvas /> :
          <Canvas height='500px'>
          </Canvas>
        }


      </div>
    )
  }
}

export default Game
