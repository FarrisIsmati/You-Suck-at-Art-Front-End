import React, { Component } from 'react'
import PropTypes            from 'prop-types'

import Canvas               from '../Canvas/Canvas'
import GameButton           from '../GameButton/GameButton'

import                            './Draw.css'
class Draw extends Component {
  render() {
    return (
      <div className="draw-holder">
        <Canvas width={'100%'}/>
        <div className='input-holder'>
          <GameButton title='Next'/>
        </div>
      </div>
    )
  }
}

export default Draw;
