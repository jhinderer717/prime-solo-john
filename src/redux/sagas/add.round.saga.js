// import { put, takeLatest } from 'redux-saga/effects'; -- take line out later, I don't think a put will be needed
import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addRound(action) {
   //console.log('addRoundSaga hit with:', action.payload);
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