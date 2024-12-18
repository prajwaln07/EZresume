export const setUser = (details) => {
    return {
      type: 'SET_USER',
      payload: details,
    };
  };
 

 
  export const userLogout = () => {
    return {
      type: 'LOGOUT',
    };
  };
 

  