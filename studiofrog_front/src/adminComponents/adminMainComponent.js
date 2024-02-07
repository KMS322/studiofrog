import "../css/adminMain.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_LISTS_REQUEST,
  DELETE_LIST_REQUEST,
  CHANGE_MAIN_REQUEST,
} from "../reducers/videoList";
import UploadForm from "./adminUploadForm";
const AdminMainComponent = () => {
  const [openForm, setOpenForm] = useState(false);
  const [mainUrl, setMainUrl] = useState("");
  const [mainChange, setMainChange] = useState(true);
  const dispatch = useDispatch();
  const { lists, addListsDone } = useSelector((state) => state.videoList);
  const mainList = lists && lists.filter((list) => list.type === "main");
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
  const handleMain = (e) => {
    setMainUrl(e.target.value);
  };
  const changeMain = () => {
    dispatch({
      type: CHANGE_MAIN_REQUEST,
      data: mainUrl,
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
        <div className="content_row row main">
          <p>Main</p>
          {mainChange ? (
            <input
              type="text"
              name={mainUrl}
              value={mainUrl}
              onChange={(e) => {
                handleMain(e);
              }}
            />
          ) : (
            <p>{mainList.file_url}</p>
          )}
          {mainChange ? <p></p> : <p>{mainList.file_title}</p>}

          <div className="delete_btn">
            {mainChange ? (
              <p onClick={changeMain}>저장</p>
            ) : (
              <p
                onClick={() => {
                  setMainChange(true);
                }}
              >
                수정
              </p>
            )}
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
