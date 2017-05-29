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
            messagesSize: 100,
            shouldAutoScroll: true
        }
    }

    /**
     * Get UL DOM element after the component mounts
     */
    componentDidMount() {
        this.setState({list: document.getElementById(this.props.title + '_list')});
    }

    /**
     * Triggers on list scroll. Checks if the scroller is at the bottom of the list or not.
     * If it is, the list will NOT autoscroll.
     * @param {Object} event - JS event Object
     */
    scrollTriggered(event) {
        this.setState({shouldAutoScroll: false});
        if (event.target.scrollHeight === event.target.offsetHeight + event.target.scrollTop) this.setState({shouldAutoScroll: true});
    }

    /**
     * Keeps the scroller at the bottom of the list after being updated with new data.
     */
    componentDidUpdate() {
        if (this.state.shouldAutoScroll) this.state.list.scrollTop = this.state.list.scrollHeight;
    }

    /**
     * Click listener for 'Remove channel' button.
     * @param {Object} event - JS event Object
     */
    onClick(event){
        this.props.removeChannel(this.props.title);
    }

    /**
     * Update the component state value after input changed.
     * @param {Object} event - JS event object
     */
    onSearchChange(event) {
        this.setState({
            searchText: event.target.value
        });
    }

    render(){
        let messages = [];
        if (this.state.searchText !== '') {
            messages = this.props.messages.map((item, index) => {
                if (item.userInfo.username.toLowerCase().includes(this.state.searchText.toLowerCase()) || 
                    item.message.toLowerCase().includes(this.state.searchText.toLowerCase())) 
                {
                    let thisStyle = {color: item.userInfo.color};
                    return <ListitemComponent index = {index} username = {item.userInfo['display-name']}  style = {thisStyle} message = {item.message} />    
                }
            });
        } else {
            messages = this.props.messages.map((item, index) => {
                if (index < this.props.messages.length - this.state.messagesSize) return;
                
                let thisStyle = {color: item.userInfo.color};

                return <ListitemComponent index = {index} username = {item.userInfo['display-name']}  style = {thisStyle} message = {item.message} />
            });
        }

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