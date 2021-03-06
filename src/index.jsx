import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

const store = createStore(reducer);

// Server is sending 'state' events once a connection is made
const socket = io(`${location.protocol}//${location.hostname}:8090`);

// Listens to 'state' events from socket and dispatches 'SET_STATE' action to Store
socket.on('state', state =>
  store.dispatch(setState(state))
);

// The 'App' component is the root route
// The root component serves as the template, rendering the markup that
// is common across all routes
const routes = <Route component={App}>
  <Route path="/results" component={ResultsContainer} />
  <Route path="/" component={VotingContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
