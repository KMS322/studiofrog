import "../css/adminMain.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  LOAD_LISTS_REQUEST,
  DELETE_LIST_REQUEST,
  CHANGE_MAIN_REQUEST,
  CHANGE_ABOUT_REQUEST,
} from "../reducers/videoList";
import { DELETE_FILE_REQUEST } from "../reducers/contact";

import { LOAD_KAKAO_REQUEST } from "../reducers/kakao";

import UploadForm from "./adminUploadForm";
import Loading from "./loading";
import { API_URL } from "../constants";
const AdminMainComponent = () => {
  const location = useLocation();
  const me = location.state && location.state.me;
  const [openForm, setOpenForm] = useState(false);
  const [mainUrl, setMainUrl] = useState("");
  const [aboutUrl, setAboutUrl] = useState("");
  const [mainChange, setMainChange] = useState(false);
  const [aboutChange, setAboutChange] = useState(false);
  const { kakao } = useSelector((state) => state.kakao);
  const [openLoading, setOpenLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("loading");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_KAKAO_REQUEST,
    });
  }, []);
  const {
    lists,
    addListsDone,
    changeMainDone,
    changeAboutDone,
    addListsLoading,
    deleteListDone,
  } = useSelector((state) => state.videoList);
  const { deleteFileDone } = useSelector((state) => state.contact);
  const mainList = lists && lists.filter((list) => list.type === "main");
  const aboutList = lists && lists.filter((list) => list.type === "about");
  const portfolioLists =
    lists && lists.filter((list) => list.type === "portfolio");
  useEffect(() => {
    if (deleteListDone) {
      window.location.href = "/adminMain";
    }
  }, [deleteListDone]);
  useEffect(() => {
    if (deleteFileDone) {
      window.location.href = "/adminMain";
    }
  }, [deleteFileDone]);
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
      window.location.href = "/adminMain";
    }
  }, [changeMainDone]);
  useEffect(() => {
    if (changeAboutDone) {
      window.location.href = "/adminMain";
    }
  }, [changeAboutDone]);
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
  useEffect(() => {
    if (addListsLoading) {
      setLoadingMsg("loading");
      setOpenLoading(true);
      setOpenForm(false);
    } else if (addListsDone) {
      setLoadingMsg("done");
      setOpenLoading(true);
      const timeoutId = setTimeout(() => {
        setOpenLoading(false);
        window.location.href = "/adminMain";
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [addListsLoading]);
  const deleteFile = () => {
    dispatch({
      type: DELETE_FILE_REQUEST,
    });
  };
  console.log("kakao : ", kakao);
  return (
    <>
      {kakao && kakao ? (
        ""
      ) : (
        <div className="kakao_btn">
          <a href={`${API_URL}/kakao/authorize?scope=talk_message`}>코드발급</a>
        </div>
      )}
      <div className="file_delete_btn" onClick={deleteFile}>
        첨부파일삭제
      </div>
      {me && me === "admin" ? (
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
                <p>
                  {aboutList && aboutList.length && aboutList[0].file_title}
                </p>
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
          {openLoading ? <Loading data={loadingMsg} /> : ""}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AdminMainComponent;
