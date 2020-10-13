import { actionChannel, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getRound() {
   console.log('getRoundSaga hit');
   let response = yield axios({
      method: 'GET',
      url: '/api/golf',
   });
   console.log('response:', response.data);
   yield put({
      type: 'FETCH_ROUND',
      payload: response.data
   });
}

function* getRoundSaga() {
  yield takeLatest('GET_ROUNDS', getRound);
}

export default getRoundSaga;