import React, {Component} from 'react';
import tmi from 'tmi.js';

import config from './tmi.config';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';

import './App.scss';

const client = new tmi.client(config);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      channelTitle: '',
      channels: [],
      messages: [],
      connected: false,
      error: false
    };
  }
    
  componentWillMount() {
    client.connect();
    
    client.on('connected', () => {
      this.setState({ connected: true });
    });
    
    client.on("disconnected", reason => {
      this.setState({ connected: false });
    });
    
    client.on('message', (channel, userstate, message, self) => {
      this.setState({ messages: [...this.state.messages, { channel, message, userInfo: userstate }] });
    });
  }

  /**
   * Listening for 'Enter' keydown - just so user doesn't have to click 'Add' button
   * @param {Object} event - JS event object
   */
  onKeyDown(event) {
    if (event.keyCode === 13) this.joinChannel();
  }

  /**
   * Dettaches client from channel and dispatches removeChannel action.
   * @param {String} channelTitle - title of a channel to remove
   */
  removeChannel(channelTitle) {
    client.part(channelTitle)
      .then(data => {
        this.setState({
          channels: this.state.channels.filter(channel => channel !== channelTitle),
          messages: this.state.messages.filter(item => item.channel !== channelTitle),
        })
      });
  }

  /**
   * Attaches client to a channel and dispatches addChannel action.
   * @param {Object} event - JS event object
   */
  joinChannel(event) {
    client.join(this.state.channelTitle)
      .then(data => {
        this.setState({
          channels: [...this.state.channels, data[0]],
          channelTitle: ''
        });
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
    const channelComps = this.state.channels.map((channel, index) =>  {
      const channelMessages = this.state.messages.filter(item => item.channel === channel);
      return <ChatContainer key={index} title={channel} messages={channelMessages} removeChannel={this.removeChannel.bind(this)}/>;
    });

    return <div className = "app-wrapper">
      <Header />
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

export default App;