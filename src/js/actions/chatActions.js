export function chatConnected(address, port){
    return {
        type: 'CHAT_CONNECTED',
        payload: { address, port}
    }
}

export function chatDisconnected(reason){
    return {
        type: 'CHAT_DISCONNECTED',
        payload: { reason }
    }
}

export function handleMessage(channel, message, userInfo){
    return {
        type: 'MESSAGE_RECEIVED',
        payload: { channel, message, userInfo }
    }
}

export function addChannel(channel){
    return {
        type: 'CHANNEL_ADD',
        payload: channel
    }
}

export function removeChannel(title){
    return {
        type: 'CHANNEL_REMOVE',
        payload: title
    }
}