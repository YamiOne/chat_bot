import {createStore, applyMiddleware} from 'redux';

import reducer from '../reducers/MainReducer';

export default createStore(reducer);