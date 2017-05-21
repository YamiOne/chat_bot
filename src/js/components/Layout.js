import React, {Component} from 'react';
import { connect } from 'react-redux';
import tmi from 'tmi.js';

import ChatContainer from './ChatContainer';
import * as chatActions from '../actions/chatActions';
import config from '../tmi.config';

const client = new tmi.client(config);

function mapStoreToProps(store){
    return {
        messages: store.chatReducer.messages,
        channels: store.chatReducer.channels,
        chatConnected: store.chatReducer.connected,
        error: store.chatReducer.error
    };
}

class Layout extends Component {
    componentWillMount(){
        const { dispatch } = this.props;
        this.state = {
            channelTitle: ''
        }

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

    removeChannel(channelTitle){
        client.part(channelTitle)
            .then(data => this.props.dispatch(chatActions.removeChannel(channelTitle)));
    }

    joinChannel(event){
        client.join(this.state.channelTitle)
            .then(data => {
                this.props.dispatch(chatActions.addChannel(data[0]));
                this.setState({channelTitle: ''});
            });
    }

    channelTitleChanged(event){
        this.setState({channelTitle: event.target.value});
    }

    render() {
        const channelComps = this.props.channels.map((channel, index) =>  {
            let channelMessages = this.props.messages.filter(item => item.channel === channel);
            return <ChatContainer key = {index} title = {channel} messages = {channelMessages} removeChannel = {this.removeChannel.bind(this)}/>;
        });

        return <div>
            <input type = "text" value = {this.state.channelTitle} onChange = {this.channelTitleChanged.bind(this)} />
            <button onClick = {this.joinChannel.bind(this)}>Join another channel</button>
            {channelComps}
        </div>;
    }
}

export default connect(mapStoreToProps)(Layout);