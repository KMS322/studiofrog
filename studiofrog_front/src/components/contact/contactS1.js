import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEND_EMAIL_REQUEST } from "../../reducers/contact";
import { SEND_KAKAO_REQUEST } from "../../reducers/kakao";

import Modal from "./modal";
import axios from "axios";

const ContactS1 = () => {
  const dispatch = useDispatch();
  const { sendEmailDone } = useSelector((state) => state.contact);
  const [companyName, setCompanyName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [period, setPeriod] = useState("");
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [content, setContent] = useState("");
  const [check, setCheck] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  useEffect(() => {
    if (sendEmailDone) {
      setModalMsg("success");
      setModalOpen(true);
    }
  }, [sendEmailDone]);

  useEffect(() => {
    if (modalOpen) {
      const timeoutId = setTimeout(() => {
        setModalOpen(false);

        if (modalMsg === "success") {
          window.location.href = "/";
        }
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [modalOpen, modalMsg]);

  const handleInput = (e, inputType) => {
    if (inputType === "companyName") {
      setCompanyName(e.target.value);
    } else if (inputType === "tel") {
      setTel(e.target.value);
    } else if (inputType === "email") {
      setEmail(e.target.value);
    } else if (inputType === "period") {
      setPeriod(e.target.value);
    } else if (inputType === "content") {
      setContent(e.target.value);
    }
  };
  const handleFileChange = (e) => {
    const attachedFile = e.target.files[0];
    setFile(attachedFile);
    setSelectedFileName(attachedFile ? attachedFile.name : "");
    setFilePath(URL.createObjectURL(attachedFile));
  };

  const sendForm = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file, encodeURIComponent(file.name));
        await axios.post("/list/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      if (!companyName || !tel || !email || !period || !content) {
        setModalMsg("fail");
        setModalOpen(true);
      } else if (!check) {
        setModalMsg("unChecked");
        setModalOpen(true);
      } else {
        // dispatch({
        //   type: SEND_EMAIL_REQUEST,
        //   data: {
        //     companyName,
        //     tel,
        //     email,
        //     period,
        //     selectedFileName,
        //     content,
        //   },
        // });
        dispatch(
          {
            type: SEND_KAKAO_REQUEST,
            data: {
              companyName,
              tel,
              email,
              period,
              selectedFileName,
              content,
            },
          },
          [companyName, tel, email, period, selectedFileName, content]
        );
      }
    } catch (error) {
      console.error("Error sending form:", error);
    }
  };
  return (
    <>
      <div className="contact_s1">
        <p>CONTACT</p>
        <div className="article_container">
          <div className="sub_container">
            <div className="input_box">
              <p>
                회사명 또는 성함 <sup>*</sup>
              </p>
              <input
                type="text"
                name="companyName"
                value={companyName}
                onChange={(e) => {
                  handleInput(e, "companyName");
                }}
              />
            </div>
            <div className="input_box">
              <p>
                전화번호 <sup>*</sup>
              </p>
              <input
                type="text"
                name="tel"
                value={tel}
                onChange={(e) => {
                  handleInput(e, "tel");
                }}
              />
            </div>
            <div className="input_box">
              <p>
                이메일 <sup>*</sup>
              </p>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => {
                  handleInput(e, "email");
                }}
              />
            </div>
            <div className="input_box">
              <p>
                일정 <sup>*</sup>
              </p>
              <input
                type="text"
                name="period"
                value={period}
                onChange={(e) => {
                  handleInput(e, "period");
                }}
              />
            </div>
          </div>
          <div className="sub_container">
            <div className="file_box">
              <p>레퍼런스</p>
              <label htmlFor="file">
                <div className="upload_btn">
                  <img src="/images/clip.png" alt="" />
                  <p>
                    &nbsp;{selectedFileName || "파일첨부, 링크첨부 (최대20MB)"}
                  </p>
                </div>
              </label>
              <input id="file" type="file" onChange={handleFileChange} />
            </div>
            <div className="textarea_box">
              <p>
                상담내용 <sup>*</sup>
              </p>
              <textarea
                type="text"
                name="content"
                value={content}
                onChange={(e) => {
                  handleInput(e, "content");
                }}
                placeholder="상담내용을 입력해주세요."
              />
            </div>
          </div>
        </div>
        <div className="check_box">
          <img
            src={
              check ? "/images/checked_btn.png" : "/images/unChecked_btn.png"
            }
            alt=""
            onClick={() => {
              setCheck(!check);
            }}
          />

          <p>
            <u>개인정보수집</u>에 동의합니다.
          </p>
        </div>
        <div className="submit_btn" onClick={sendForm}>
          문의하기
        </div>
      </div>
      {modalOpen && <Modal data={modalMsg} />}
    </>
  );
};

export default ContactS1;
