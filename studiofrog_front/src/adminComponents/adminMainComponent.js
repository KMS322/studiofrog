import "../css/adminMain.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_LISTS_REQUEST, DELETE_LIST_REQUEST } from "../reducers/videoList";
import UploadForm from "./adminUploadForm";
const AdminMainComponent = () => {
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const { lists, addListsDone } = useSelector((state) => state.videoList);
  useEffect(() => {
    if (addListsDone) {
      setOpenForm(false);
    }
  }, [addListsDone]);
  useEffect(() => {
    dispatch({
      type: LOAD_LISTS_REQUEST,
    });
  }, [dispatch]);
  const deleteList = (id) => {
    dispatch({
      type: DELETE_LIST_REQUEST,
      data: {
        id,
      },
    });
  };
  return (
    <div className="adminMain">
      <div className="upload_btn">
        <p
          onClick={() => {
            setOpenForm(true);
          }}
        >
          <span>+</span> 업로드
        </p>
      </div>
      <div className="table">
        <div className="head_row row">
          <p>NO</p>
          <p>Youtube Url</p>
          <p>Youtube title</p>
          <p></p>
        </div>
        <div className="content_row row">
          <p>Main</p>
          <p></p>
          <p></p>
          <div className="delete_btn">
            <p
              onClick={() => {
                deleteList();
              }}
            >
              삭제
            </p>
          </div>
        </div>
        {lists &&
          lists.map((list, index) => {
            return (
              <div
                className={
                  index % 2 === 0
                    ? "content_row row"
                    : "content_row row even_row"
                }
                key={index}
              >
                <p>{index + 1}</p>
                <p>{list.file_url}</p>
                <p>{list.file_title}</p>
                <div className="delete_btn">
                  <p
                    onClick={() => {
                      deleteList(list.id);
                    }}
                  >
                    삭제
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      {openForm ? (
        <UploadForm
          handlePopup={() => {
            setOpenForm(false);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminMainComponent;
