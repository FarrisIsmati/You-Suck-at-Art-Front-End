import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import axios                from 'axios'

class Guess extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      image: ''
    }

    this.getGameData = this.getGameData.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  getGameData() {
    axios.get(`https://project3-sjf.herokuapp.com/api/game/${this.props.match.params.gameId}`)
      .then((response) => {
          this.setState({...response.data})
          this.setState({loaded: true})
          console.log(this.state.history[0].drawing)
        })
      .catch((err) => console.log(err))
  }

  onSave(){
    axios.post(`https://project3-sjf.herokuapp.com/api/game/${this.props.match.params.gameId}/history`, {
        'guess': 'A test string'
      })
      .then((response) => {
        console.log('run request')
        this.props.requestdata()

      })
      .catch((err) => console.log(err))
  }

  componentDidMount() {
    this.getGameData()
  }

  render() {
    //Find height width of image and set it to that
    const tempImgStyle = {
      width: '100%',
      height: '100%',
      backgroundColor: '#E24E24'
    }
    return (
      <div>
        {
          this.state.loaded && this.state.history.length >= 1 ?
          <img src={this.state.history[this.state.guesses - 1].drawing}/>:
          <div style={tempImgStyle}></div>
        }
        <div className='input-holder'>
          <p onClick={this.onSave}>Next</p>
        </div>
      </div>
    )
  }
}

export default Guess
