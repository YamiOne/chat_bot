import React, { Component } from 'react';

import { removeChannel } from '../actions/chatActions';

class ChatContainer extends Component {
    onClick(event){
        this.props.removeChannel(this.props.title);
    }

    render(){
        const messages = this.props.messages.map((item, index) => {
            let thisStyle = {
                'color': item.userInfo.color
            };

            return <li key = {index}>
                <span style = {thisStyle}>{item.userInfo['display-name']}: </span>
                <span>{item.message}</span>
            </li>
        });

        return <div>
            <h1>{this.props.title}</h1>
            <ul>{messages}</ul>
            <button onClick = {this.onClick.bind(this)}>Remove channel</button>
        </div>
    }
}

export default ChatContainer;