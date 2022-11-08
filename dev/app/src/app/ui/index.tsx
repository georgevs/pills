import React from 'react';
import ReactDOM from 'react-dom';
import ReactRedux from 'react-redux';
import Redux from 'redux';
import ReduxThunk from 'redux-thunk';

import reducer from './reducer';

import App from './wrappers/app';

import './index.css';

export const renderUi = (node) => {
  ReactDOM.render(
    <ReactRedux.Provider store={store()}>
      <App />
    </ReactRedux.Provider>, 
    node
  );
};

const store = () => Redux.createStore(reducer, Redux.applyMiddleware(ReduxThunk));
