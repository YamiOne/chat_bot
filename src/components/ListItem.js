import React from 'react';

const ListItemComponent = ({ style, username, message }) => (
  <li>
    <span style={style}>{username}: </span>
    <span>{message}</span>
  </li>
);

export default ListItemComponent;