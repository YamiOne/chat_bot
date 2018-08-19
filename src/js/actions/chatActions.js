export const chatConnected = (address, port) => ({
  type: 'CHAT_CONNECTED',
  payload: { address, port }
});

export const chatDisconnected = (reason) => ({
  type: 'CHAT_DISCONNECTED',
  payload: { reason }
});

export const handleMessage = (channel, message, userInfo) => ({
  type: 'MESSAGE_RECEIVED',
  payload: { channel, message, userInfo }
});

export const addChannel = (channel) => ({
  type: 'CHANNEL_ADD',
  payload: channel
});

export const removeChannel = (title) => ({
  type: 'CHANNEL_REMOVE',
  payload: title
});