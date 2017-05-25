import React, { Component } from 'react';

class HeaderComponent extends Component {
    render() {
        return <div className = "header">
                <div className = "header__logo">
                    <img src = "assets/logo.png" alt = "logo" />
                </div>
            </div>
    }
}

export default HeaderComponent;