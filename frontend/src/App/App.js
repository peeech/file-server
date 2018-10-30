import React, { Component } from 'react';
import { INIT_UI } from './ducks/ui';
import { POLL_SERVER } from './ducks/data';
import store from './../store';
import Main from './components/Main/Main';
import './App.css';

class App extends Component {
    componentDidMount() {
        store.dispatch({type: INIT_UI});

        // Start polling server for new data
        /*setInterval(() => {
            store.dispatch({type: POLL_SERVER});
        }, 5000);*/
    }

    render() {
        return (
            <Main/>
        );
    }
}

export default App;
