import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getRound() {
   //console.log('getRoundSaga hit');
   let response = yield axios({
      method: 'GET',
      url: '/api/golf',
   });
   //console.log('getRound saga response:', response.data);
   yield put({
      type: 'FETCH_ROUND',
      payload: response.data
   });
}

function* getAllRound() {
   //console.log('getAllRoundSaga hit');
   let response = yield axios({
      method: 'GET',
      url: '/api/golf/all',
   });
   //console.log('getAllRound saga response:', response.data);
   yield put({
      type: 'FETCH_ALL_ROUNDS',
      payload: response.data
   });
}

function* getSeasonRound(action) {
   console.log('getSeasonRoundSaga hit with:', action.payload);
   let response = yield axios({
      method: 'POST',
      url: '/api/golf/season',
      data: {year: action.payload}
   });
   console.log('getSeasonRound saga response:', response.data);
   yield put({
      type: 'FETCH_SEASON_ROUNDS',
      payload: response.data
   });
}

function* getRoundSaga() { 
  yield takeLatest('GET_ROUNDS', getRound);
  yield takeLatest('GET_ALL_ROUNDS', getAllRound);
  yield takeLatest('GET_SEASON_ROUNDS', getSeasonRound);
}

export default getRoundSaga;