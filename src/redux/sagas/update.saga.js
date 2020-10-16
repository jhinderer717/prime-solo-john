import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateRound(action) {
   console.log('updateRoundSaga hit with:', action.payload);
   console.log('updateRoundSaga hit with url:', action.url);
   yield axios({
      method: "PUT",
      url: action.url,
      data: action.payload,
   });
   // yield put({
   //    type: 'GET_ALL_ROUNDS',
   // });
}

function* updateRoundSaga() {
  yield takeLatest('UPDATE_ROUND', updateRound);
}

export default updateRoundSaga;