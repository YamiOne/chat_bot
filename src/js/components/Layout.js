import React, {Component} from 'react';
import { connect } from 'react-redux';
import tmi from 'tmi.js';

import HeaderComponent from './HeaderComponent';
import ChatContainer from './ChatContainer';
import * as chatActions from '../actions/chatActions';
import config from '../tmi.config';

const client = new tmi.client(config);

/**
 * Maps out Store object to state properties.
 * @param {Object} store - Store object.
 */
function mapStoreToProps(store) {
  return {
    messages: store.chatReducer.messages,
    channels: store.chatReducer.channels,
    chatConnected: store.chatReducer.connected,
    error: store.chatReducer.error
  };
}

class Layout extends Component {
    
  componentWillMount() {
    const { dispatch } = this.props;
    
    this.state = {
      channelTitle: ''
    };

    client.connect();
    
    client.on('connected', (address, port) => {
        dispatch(chatActions.chatConnected(address, port));
    });
    
    client.on("disconnected", reason => {
      dispatch(chatActions.chatDisconnected(reason));
    });
    
    client.on('message', (channel, userstate, message, self) => {
      dispatch(chatActions.handleMessage(channel, message, userstate));
    });
  }

  /**
   * Listening for 'Enter' keydown - just so user doesn't have to click 'Add' button
   * @param {Object} event - JS event object
   */
  onKeyDown(event) {
    if (event.keyCode == 13) this.joinChannel();
  }

  /**
   * Dettaches client from channel and dispatches removeChannel action.
   * @param {String} channelTitle - title of a channel to remove
   */
  removeChannel(channelTitle) {
    client.part(channelTitle)
        .then(data => this.props.dispatch(chatActions.removeChannel(channelTitle)));
  }

  /**
   * Attaches client to a channel and dispatches addChannel action.
   * @param {Object} event - JS event object
   */
  joinChannel(event) {
    client.join(this.state.channelTitle)
      .then(data => {
        this.props.dispatch(chatActions.addChannel(data[0]));
        this.setState({ channelTitle: '' });
      });
  }

  /**
   * Triggered on channel name input change. Updates the state with the value.
   * @param {Object} event - JS event object
   */
  channelTitleChanged(event) {
    this.setState({ channelTitle: event.target.value });
  }

  render() {
    const channelComps = this.props.channels.map((channel, index) =>  {
      let channelMessages = this.props.messages.filter(item => item.channel === channel);
      return <ChatContainer key={index} title={channel} messages={channelMessages} removeChannel={this.removeChannel.bind(this)}/>;
    });

    return <div className = "app-wrapper">
      <HeaderComponent />
      <div className="join-channel">
          <input type="text" className="custom-input" value={this.state.channelTitle} 
              onChange={this.channelTitleChanged.bind(this)} onKeyDown={this.onKeyDown.bind(this)}
              placeholder="Channel name..."/>
          <button onClick={this.joinChannel.bind(this)}>Add</button>
      </div>
      <div className="chat-container-wrapper">
        {channelComps}
      </div>
    </div>;
  }
}

export default connect(mapStoreToProps)(Layout);