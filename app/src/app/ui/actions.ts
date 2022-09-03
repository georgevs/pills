import { fetchData } from '../services';

export const loading = () => ({ type: 'LOADING' });
export const loaded = (data) => ({ type: 'LOADED', payload: { data } });
export const loadedError = (error) => ({ type: 'LOADED', payload: { error } });
export const loadData = () => (dispatch, getState) => {
  dispatch(loading());
  fetchData()
    .then(data => dispatch(loaded(data)))
    .catch(error => dispatch(loadedError(error)));
};
