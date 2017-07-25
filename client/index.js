import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { socket_server } from '../config';

import App from './components/app';
import reducers from './reducers';

let socket = io(socket_server);
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducers);

store.subscribe(()=>{
  console.log('new client state', store.getState());
});

store.dispatch({type:'server/hello', data:'Hello!'});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));
