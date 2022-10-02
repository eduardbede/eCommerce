import React, { Component } from 'react'

export default class SelectCategory extends Component {
  render() {
    return (
      
        <ul className="ul-list" style={{justifyContent:`${(this.props.menuOpen === true || this.props.windowSize === true ) && 'center' }`}}>
            {this.props.date}
        </ul>
    )
  }
}

