import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { removeChannel } from '../actions/chatActions';
import ListitemComponent from './ListitemComponent';

class ChatContainer extends Component {
    constructor(){
        super();
        this.state = {
            searchText: '',
            list: null,
            shouldAutoScroll: true
        }
    }

    componentDidMount() {
        this.setState({list: document.getElementById(this.props.title + '_list')});
    }

    // shouldComponentUpdate (nextProps, nextState) {
    //     return this.props.value !== nextProps.value;
    // }

    scrollTriggered(event) {
        this.setState({shouldAutoScroll: false});
        if (event.target.scrollHeight === event.target.offsetHeight + event.target.scrollTop) this.setState({shouldAutoScroll: true});
    }

    componentDidUpdate() {
        if (this.state.shouldAutoScroll) this.state.list.scrollTop = this.state.list.scrollHeight;
    }

    onClick(event){
        this.props.removeChannel(this.props.title);
    }

    onSearchChange(event) {
        this.setState({searchText: event.target.value});
    }

    render(){
        const messages = this.props.messages.map((item, index) => {
            let thisStyle = {
                'color': item.userInfo.color
            };

            return <ListitemComponent index = {index} username = {item.userInfo['display-name']}  style = {thisStyle} message = {item.message} />
        });

        return <div className = "chat-container">
            <h1 className = "title">{this.props.title}</h1>
            <button className = "custom-button custom-button--delete" onClick = {this.onClick.bind(this)}>X</button>
            <input type = "text" className = "custom-input" value = {this.state.searchText} onChange = {this.onSearchChange.bind(this)} placeholder = "Search chat" />
            <ul id = {this.props.title + '_list'} className = "chat-container__list" onScroll = {this.scrollTriggered.bind(this)}>
                {messages}
            </ul>
        </div>
    }
}

export default ChatContainer;