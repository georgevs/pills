import ReactRedux from 'react-redux';

import Component from '../components/app';
import { loadData } from '../actions';

const mapStateToProps = ({ data, isLoading, error }) => ({ data: project(data), isLoading, error });
const mapDispatchToProps = (dispatch) => ({
  loadData: () => dispatch(loadData())
});

// transform app/model into view/model
const project = (model) => {
  return model;
};

const App = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Component);

export default App;
