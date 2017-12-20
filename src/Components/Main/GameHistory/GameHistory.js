import React, { Component } from 'react'
import axios                from 'axios'

import './GameHistory.css'

class GameHistory extends Component{
  constructor(props){
    super(props)

    this.state = {
      loaded: false,
      phrase: "",
      rounds: []
    }

    this.getGameData = this.getGameData.bind(this)
  }

  getGameData() {
    axios.get(`https://project3-sjf.herokuapp.com/api/game/${this.props.match.params.gameId}`)
      .then((response) => {
        this.setState({phrase: response.data.phrase})
        let history = response.data.history
        for (let i = 0; i < history.length; i++) {
          let drawing = history[i].drawing
          let name = history[i].name
            let guess = history[i].guess
            let round = {
              drawing: drawing,
              guess: guess,
              name: name
            }
            let newRoundsArray = this.state.rounds
            newRoundsArray.push(round)
            this.setState({rounds: newRoundsArray})
        }
          this.setState({loaded: true})
          console.log(response);
          console.log(this.state.pictures)
        })
      .catch((err) => console.log(err))
  }

  componentWillMount() {
    this.getGameData()
  }

  render() {

    const GuessingRounds = this.state.rounds.map((round, index) => {
         return (
           <div>
           {round.drawing ?
             <div key={index} className="round-drawing-container">
               <img className="round-drawing" src={round.drawing} alt=""/>
               <p>Artist <span>{round.name}</span></p>
             </div>:
             <p key={index}><span>{round.name}</span> guessed <span>{round.guess}</span></p>
           }
           </div>
        )
    })

    return(
      <div className="game-history-page">
      {this.state.loaded ?
        <div>
        <p>Original phrase <span>"{this.state.phrase}"</span></p>
        {GuessingRounds}
        </div> :
        null
      }
      </div>
    )
   }
}


export default GameHistory
