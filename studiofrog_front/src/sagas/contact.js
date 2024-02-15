import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAILURE,
} from "../reducers/contact";

function sendEmailAPI(data) {
  return axios.post("/contact", data);
}

function* sendEmail(action) {
  try {
    const result = yield call(sendEmailAPI, action.data);
    yield put({
      type: SEND_EMAIL_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SEND_EMAIL_FAILURE,
      error: error.response.data,
    });
  }
}

function deleteFileAPI() {
  return axios.post("/contact/delete");
}

function* deleteFile() {
  try {
    const result = yield call(deleteFileAPI);
    yield put({
      type: DELETE_FILE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: DELETE_FILE_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchsendEmail() {
  yield takeLatest(SEND_EMAIL_REQUEST, sendEmail);
}

function* watchdeleteFile() {
  yield takeLatest(DELETE_FILE_REQUEST, deleteFile);
}

export default function* contactSaga() {
  yield all([fork(watchsendEmail), fork(watchdeleteFile)]);
}
