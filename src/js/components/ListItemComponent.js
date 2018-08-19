import React, { Component } from 'react';

class ListItemComponent extends Component {

  render() {
    return (
      <li>
        <span style={this.props.style}>{this.props.username}: </span>
        <span>{this.props.message}</span>
      </li>
    );
  }
}

export default ListItemComponent;