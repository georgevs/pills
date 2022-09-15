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
    case 'LOADED_ERROR': return { ...state, error: action.payload.error, isLoading: false, data: null };
    default: return state;
  }
};

export default reducer;
