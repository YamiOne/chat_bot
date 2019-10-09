import React, { Component } from 'react';

import Listitem from './ListItem';

class ChatContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      messagesSize: 100,
      shouldAutoScroll: true
    };

    this.onClick = this.onClick.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.scrollTriggered = this.scrollTriggered.bind(this);
  }

  /**
   * Triggers on list scroll. Checks if the scroller is at the bottom of the list or not.
   * If it is, the list will NOT autoscroll.
   * @param {Object} event - JS event Object
   */
  scrollTriggered(event) {
    this.setState({ shouldAutoScroll: false });
    
    if (event.target.scrollHeight === event.target.offsetHeight + event.target.scrollTop) {
      this.setState({ shouldAutoScroll: true });
    }
  }

  /**
   * Keeps the scroller at the bottom of the list after being updated with new data.
   */
  componentDidUpdate() {
    if (this.state.shouldAutoScroll) {
      const list = document.getElementById(this.props.title + '_list');

      if (list) {
        list.scrollTop = list.scrollHeight;
      }
    }
  }

  /**
   * Click listener for 'Remove channel' button.
   * @param {Object} event - JS event Object
   */
  onClick(/*event*/) {
    this.props.removeChannel(this.props.title);
  }

  /**
   * Update the component state value after input changed.
   * @param {Object} event - JS event object
   */
  onSearchChange(event) {
    this.setState({ searchText: event.target.value });
  }

  getMessages() {
    return this.props.messages.map((item, index) => {
      if (item.userInfo.username.toLowerCase().includes(this.state.searchText.toLowerCase()) || 
          item.message.toLowerCase().includes(this.state.searchText.toLowerCase())) 
      {
          let thisStyle = { color: item.userInfo.color };
          return <Listitem key={`${index}-${item.channel}`} uid={`${index}-${item.channel}`} username={item.userInfo['display-name']}  style={thisStyle} message={item.message} />    
      }
    });
  }

  render() {
    let messages = this.getMessages();

    return (
      <div className="chat-container">
        <h1 className="title">{this.props.title}</h1>
        <button className="custom-button custom-button--delete" onClick={this.onClick}>X</button>
        <input type="text" className="custom-input" value={this.state.searchText} onChange={this.onSearchChange} placeholder="Search chat" />
        <ul id={this.props.title + '_list'} className="chat-container__list" onScroll={this.scrollTriggered}>
          {messages}
        </ul>
      </div>
    );
  }
}

export default ChatContainer;