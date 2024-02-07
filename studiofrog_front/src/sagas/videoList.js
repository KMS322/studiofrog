import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_LISTS_REQUEST,
  LOAD_LISTS_SUCCESS,
  LOAD_LISTS_FAILURE,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAILURE,
  ADD_LISTS_REQUEST,
  ADD_LISTS_SUCCESS,
  ADD_LISTS_FAILURE,
  CHANGE_MAIN_REQUEST,
  CHANGE_MAIN_SUCCESS,
  CHANGE_MAIN_FAILURE,
  CHANGE_ABOUT_REQUEST,
  CHANGE_ABOUT_SUCCESS,
  CHANGE_ABOUT_FAILURE,
} from "../reducers/videoList";

function loadListsAPI() {
  return axios.post("/list/load");
}

function* loadLists() {
  try {
    const result = yield call(loadListsAPI);
    yield put({
      type: LOAD_LISTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_LISTS_FAILURE,
      error: err.response.data,
    });
  }
}

function addListsAPI(data) {
  return axios.post("/list/add", data);
}

function* addLists(action) {
  try {
    const result = yield call(addListsAPI, action.data);
    yield put({
      type: ADD_LISTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_LISTS_FAILURE,
      error: err.response.data,
    });
  }
}

function changeMainAPI(data) {
  return axios.post("/list/changeMain", data);
}

function* changeMain(action) {
  try {
    const result = yield call(changeMainAPI, action.data);
    yield put({
      type: CHANGE_MAIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_MAIN_FAILURE,
      error: err.response.data,
    });
  }
}

function changeAboutAPI(data) {
  return axios.post("/list/changeAbout", data);
}

function* changeAbout(action) {
  try {
    const result = yield call(changeAboutAPI, action.data);
    yield put({
      type: CHANGE_ABOUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_ABOUT_FAILURE,
      error: err.response.data,
    });
  }
}

function deleteListAPI(data) {
  return axios.post("/list/delete", data);
}

function* deleteList(action) {
  try {
    const result = yield call(deleteListAPI, action.data);
    yield put({
      type: DELETE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchloadLists() {
  yield takeLatest(LOAD_LISTS_REQUEST, loadLists);
}

function* watchaddlists() {
  yield takeLatest(ADD_LISTS_REQUEST, addLists);
}

function* watchChangeMain() {
  yield takeLatest(CHANGE_MAIN_REQUEST, changeMain);
}

function* watchChangeAbout() {
  yield takeLatest(CHANGE_ABOUT_REQUEST, changeAbout);
}

function* watchdeletelist() {
  yield takeLatest(DELETE_LIST_REQUEST, deleteList);
}

export default function* videoListSaga() {
  yield all([
    fork(watchloadLists),
    fork(watchdeletelist),
    fork(watchaddlists),
    fork(watchChangeMain),
    fork(watchChangeAbout),
  ]);
}
