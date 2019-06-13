import React, { Component } from 'react';

// This is the heading for the app.
class Heading extends Component {
  render(){
    return(
      <h2>{this.props.subject} Photos</h2>
    )
  }
}

export default Heading;