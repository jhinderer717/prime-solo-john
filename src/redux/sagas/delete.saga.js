import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteRound(action) {
   console.log('deleteRoundSaga hit with:', action.payload);
   yield axios({
      method: "DELETE",
      url: `/api/golf/${action.payload}`,
   });
   yield put({
      type: 'GET_ALL_ROUNDS',
   });
}

function* deleteRoundSaga() {
  yield takeLatest('DELETE_ROUND', deleteRound);
}

export default deleteRoundSaga;