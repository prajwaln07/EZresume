// Initial state
const initialState = {
    isDarkmode: true, // Default to dark mode
  };
  
  // Reducer function
  const themeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_THEME':
        return {
          ...state,
          isDarkmode: !state.isDarkmode, // Toggle theme
        };
      default:
        return state;
    }
  };
  
  export default themeReducer;
  