import React from 'react';

export default class WelcomeMessage extends React.Component {  
  render() {
    return (
      <header>
        <h1>Welcome to {this.props.data.title}.</h1>
      </header>
    )
  }
}