import "../css/adminMain.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_LISTS_REQUEST,
  DELETE_LIST_REQUEST,
  CHANGE_MAIN_REQUEST,
  CHANGE_ABOUT_REQUEST,
} from "../reducers/videoList";
import UploadForm from "./adminUploadForm";
const AdminMainComponent = () => {
  const [openForm, setOpenForm] = useState(false);
  const [mainUrl, setMainUrl] = useState("");
  const [aboutUrl, setAboutUrl] = useState("");
  const [mainChange, setMainChange] = useState(false);
  const [aboutChange, setAboutChange] = useState(false);
  const dispatch = useDispatch();

  const { lists, addListsDone, changeMainDone, changeAboutDone } = useSelector(
    (state) => state.videoList
  );
  const mainList = lists && lists.filter((list) => list.type === "main");
  const aboutList = lists && lists.filter((list) => list.type === "about");
  const portfolioLists =
    lists && lists.filter((list) => list.type === "portfolio");
  useEffect(() => {
    setMainChange(
      !lists || lists.filter((list) => list.type === "main").length === 0
    );
  }, [lists]);
  useEffect(() => {
    setAboutChange(
      !lists || lists.filter((list) => list.type === "about").length === 0
    );
  }, [lists]);
  useEffect(() => {
    if (changeMainDone) {
      window.location.href = "/admin";
    }
  }, [changeMainDone]);
  useEffect(() => {
    if (changeAboutDone) {
      window.location.href = "/admin";
    }
  }, [changeAboutDone]);
  useEffect(() => {
    if (addListsDone) {
      setOpenForm(false);
      window.location.href = "/admin";
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
  const handleAbout = (e) => {
    setAboutUrl(e.target.value);
  };
  const changeMain = () => {
    dispatch({
      type: CHANGE_MAIN_REQUEST,
      data: { mainUrl },
    });
  };
  const changeAbout = () => {
    dispatch({
      type: CHANGE_ABOUT_REQUEST,
      data: { aboutUrl },
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
              value={mainUrl}
              onChange={(e) => {
                handleMain(e);
              }}
            />
          ) : (
            <p>{mainList && mainList.length && mainList[0].file_url}</p>
          )}
          {mainChange ? (
            <p></p>
          ) : (
            <p>{mainList && mainList.length && mainList[0].file_title}</p>
          )}

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
        <div className="content_row row main">
          <p>About</p>
          {aboutChange ? (
            <input
              type="text"
              value={aboutUrl}
              onChange={(e) => {
                handleAbout(e);
              }}
            />
          ) : (
            <p>{aboutList && aboutList.length && aboutList[0].file_url}</p>
          )}
          {aboutChange ? (
            <p></p>
          ) : (
            <p>{aboutList && aboutList.length && aboutList[0].file_title}</p>
          )}

          <div className="delete_btn">
            {aboutChange ? (
              <p onClick={changeAbout}>저장</p>
            ) : (
              <p
                onClick={() => {
                  setAboutChange(true);
                }}
              >
                수정
              </p>
            )}
          </div>
        </div>
        {portfolioLists &&
          portfolioLists.map((list, index) => {
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