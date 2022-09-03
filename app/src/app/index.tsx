import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { connect, Provider } from 'react-redux';

import './index.css';


//-----------------------------------------------------------------------------------------------
const App = ({ data = null, isLoading = false, error = null, loadData }) => {

  useEffect(() => { loadData() }, []);

  return (
    <>
      <h1>Pills (v1)</h1>
      {data && <Schedule data={data} />}
      {isLoading && <p>Loading...</p>}
      {error && <ErrorBanner error={error} />}
    </>
  );
};

const mapStateToProps = ({ data, isLoading, error }) => ({ data, isLoading, error });
const mapDispatchToProps = (dispatch) => ({
  loadData: () => dispatch(loadData())
});

const AppWrapper = connect(mapStateToProps, mapDispatchToProps)(App);

//-----------------------------------------------------------------------------------------------
const Schedule = ({ data }) => (
  <ul>
    {data.map(i => <li>{i}</li>)}
  </ul>
);
//-----------------------------------------------------------------------------------------------
const ErrorBanner = ({ error: { name, message } }) => (
  <p className='error banner'>{name}: {message}</p>
);

//-----------------------------------------------------------------------------------------------
const loading = () => ({ type: 'LOADING' });
const loaded = (data) => ({ type: 'LOADED', payload: { data } });
const loadedError = (error) => ({ type: 'LOADED', payload: { error } });

const loadData = () => (dispatch, getState) => {
  dispatch(loading());
  fetchData()
    .then(data => dispatch(loaded(data)))
    .catch(error => dispatch(loadedError(error)));
};

//-----------------------------------------------------------------------------------------------
// const fetchData = () => (
//   fetch('https://spamfro.xyz/api/data')   // config.data.url
//     .then(resp => { 
//       if (!resp.ok) { throw Error(resp.statusText) }
//       return resp.json();
//     })
// );

const fetchData = () => Promise.resolve([
  'item #1',
  'item #2',
  'item #3',
  'item #4',
  'item #5',
]);

//-----------------------------------------------------------------------------------------------
const initialState = () => ({ 
  error: null,
  isLoading: false, 
  data: null, 
});

const reducer = (state = initialState(), action) => {
  // console.log('app/state', 'action:', action);
  switch (action.type) {
    case 'LOADING': return { ...state, error: null, isLoading: true, data: null };
    case 'LOADED': return { ...state, error: null, isLoading: false, data: action.payload.data };
    case 'LOAD_ERROR': return { ...state, error: action.payload.error, isLoading: false, data: null };
    default: return state;
  }
};

const store = () => createStore(reducer, applyMiddleware(ReduxThunk));


//-----------------------------------------------------------------------------------------------
ReactDOM.render(
  <Provider store={store()}>
    <AppWrapper />
  </Provider>, 
  document.getElementById('app')
);

window.addEventListener('load', () => {
  // register();
});

const register = () => {
  navigator.serviceWorker.register('sw.js')
    .then(registration => {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
      // registration.unregister(); // debug...
    });
};
