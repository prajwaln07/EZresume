
const initialState = {
  email: null,
  username: null,
  resumeIds: [],  // An array of resume IDs
  role: null,
  isAuthenticated: false,  // Boolean to check if user is logged in
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        email: action.payload.email,
        username: action.payload.username,
        resumeIds: action.payload.resumes,
        role: action.payload.role,
        isAuthenticated: true,
      };
      
    case "LOGOUT":
      return {
        ...state,
        email: null,
        username: null,
        resumeIds: [],
        role: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default userReducer;
