import produce from "../util/produce";

export const initialState = {
  sendEmailLoading: false,
  sendEmailDone: false,
  sendEmailError: null,
  deleteFileLoading: false,
  deleteFileDone: false,
  deleteFileError: null,
};

export const SEND_EMAIL_REQUEST = "SEND_EMAIL_REQUEST";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILURE = "SEND_EMAIL_FAILURE";

export const DELETE_FILE_REQUEST = "DELETE_FILE_REQUEST";
export const DELETE_FILE_SUCCESS = "DELETE_FILE_SUCCESS";
export const DELETE_FILE_FAILURE = "DELETE_FILE_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SEND_EMAIL_REQUEST:
        draft.sendEmailLoading = true;
        draft.sendEmailError = null;
        draft.sendEmailDone = false;
        break;
      case SEND_EMAIL_SUCCESS:
        draft.sendEmailLoading = false;
        draft.sendEmailDone = action.data;
        break;
      case SEND_EMAIL_FAILURE:
        draft.sendEmailLoading = false;
        draft.sendEamilError = action.error;
        break;
      case DELETE_FILE_REQUEST:
        draft.deleteFileLoading = true;
        draft.deleteFileError = null;
        draft.deleteFileDone = false;
        break;
      case DELETE_FILE_SUCCESS:
        draft.deleteFileLoading = false;
        draft.deleteFileDone = true;
        break;
      case DELETE_FILE_FAILURE:
        draft.deleteFileLoading = false;
        draft.deleteFileError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
