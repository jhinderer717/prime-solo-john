const roundReducer = (state = [], action) => {
  if(action.type === 'FETCH_ROUND'){
    //console.log('roundReducer hit, entering to reduxState:', action.payload);
    return action.payload;
  }
  return state;
};

// user will be on the redux state at:
// state.user
export default roundReducer;
