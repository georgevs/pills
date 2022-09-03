import ReactRedux from 'react-redux';

import Component from '../components/app';
import { loadData } from '../actions';

const mapStateToProps = ({ data, isLoading, error }) => ({ data, isLoading, error });
const mapDispatchToProps = (dispatch) => ({
  loadData: () => dispatch(loadData())
});

const App = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Component);

export default App;
