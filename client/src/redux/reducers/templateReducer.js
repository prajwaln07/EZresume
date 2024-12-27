// Initial state
const initialState = {
  selectedTemplate: 'ModernLayout', 
};

// Reducer function
const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TEMPLATE':
      return {
        ...state, // Spread existing state
        selectedTemplate: action.payload, // Update selectedTemplate
      };

    default:
      return state;
  }
};

export default templateReducer;
