const defaultState = {
    channels: [],
    messages: [],
    connected: false,
    error: false
};

function reducer(state = defaultState, action) {
    switch(action.type){
        case 'CHAT_CONNECTED':
            return {
                ...state,
                connected: true
            }
        case 'CHAT_DISCONNECTED':
            return {
                ...state,
                connected: false,
                error: true
            }
        case 'MESSAGE_RECEIVED':
            let currentMessages = state.messages;
            return {
                ...state,
                messages: [...currentMessages, action.payload]
            }
        case 'CHANNEL_ADD':
            let currentChannels = state.channels;
            return {
                ...state,
                channels: [...currentChannels, action.payload]
            }
        case 'CHANNEL_REMOVE':
            return {
                ...state,
                channels: state.channels.filter(channel => channel !== action.payload)
            }
    }
    return state;
}

module.exports = reducer;