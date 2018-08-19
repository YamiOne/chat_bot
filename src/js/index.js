import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import MainStore from './stores/MainStore';
import Layout from './components/Layout';

const app = document.getElementById('app');

ReactDOM.render(<Provider store={MainStore}><Layout /></Provider>, app);