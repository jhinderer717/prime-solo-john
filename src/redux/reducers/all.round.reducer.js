const allRoundReducer = (state = [], action) => { // state = {} had to be changed to state = [] for .map to work
   if(action.type === 'FETCH_ALL_ROUNDS'){
     //console.log('roundReducer hit', action.payload);
     return action.payload;
   }
   return state;
};
 
// user will be on the redux state at:
// state.user
export default allRoundReducer;
