// Initial state
const initialState = {
    loading: false, // Default to dark mode
  };
  
  // Reducer function
  const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOADING':
        return {
          ...state,
          loading: true, // Toggle theme
        };
        case 'UNSET_LOADING':
            return {
              ...state,
              loading: false, // Toggle theme
            };
      default:
        return state;
    }
  };
  
  export default loadingReducer;
  