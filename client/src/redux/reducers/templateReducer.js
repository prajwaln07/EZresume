// Initial state
const initialState = {
  selectedTemplate: 'ModernLayout',  // The currently selected template
  selectedTemplateID: '676effec4bb045bbcd66e9d6',
  templates: [],                     // Store the list of templates
  error: null,                       // Store any error that occurs during fetching
};

// Reducer function
const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TEMPLATE':
      return {
        ...state, // Spread existing state
        selectedTemplate: action.payload, // Update selectedTemplate
      };

      case 'SET_TEMPLATEID':
        return {
          ...state, // Spread existing state
          selectedTemplateID: action.payload, // Update selectedTemplate
        };
      
    case 'FETCH_TEMPLATES_SUCCESS':
      return {
        ...state,
        templates: action.payload,  // Store the templates fetched from the backend
      };
      
    case 'FETCH_TEMPLATES_FAILURE':
      return {
        ...state,
        error: action.payload,  // Store the error message
      };

    default:
      return state;
  }
};

export default templateReducer;
