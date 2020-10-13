import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addRound(action) {
   console.log('addRoundSaga hit', action.payload);
   // try {
   //    yield axios.post('/api/golf', action.payload);
   // } catch (error) {
   //    console.log('Error with user login:', error);
   // }
   yield axios({
      method: 'POST',
      url: '/api/golf',
      data: action.payload
   });
}

function* addRoundSaga() {
  yield takeLatest('ADD_ROUND', addRound);
}

export default addRoundSaga;