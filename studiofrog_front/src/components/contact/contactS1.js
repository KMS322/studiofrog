import React, { useState, useEffect } from "react";
const ContactS1 = () => {
  const [projectPurpose, setProjectPurpose] = useState("");
  const [projectName, setProjectName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [period, setPeriod] = useState("");
  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [content, setContent] = useState("");
  const [check, setCheck] = useState(false);
  useEffect(() => {
    console.log("projectPurpose : ", projectPurpose);
  }, [projectPurpose]);
  const handleInput = (e, inputType) => {
    if (inputType === "projectPurpose") {
      setProjectPurpose(e.target.value);
    } else if (inputType === "projectName") {
      setProjectName(e.target.value);
    } else if (inputType === "companyName") {
      setCompanyName(e.target.value);
    } else if (inputType === "name") {
      setName(e.target.value);
    } else if (inputType === "tel") {
      setTel(e.target.value);
    } else if (inputType === "email") {
      setEmail(e.target.value);
    } else if (inputType === "budget") {
      setBudget(e.target.value);
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
  };
  return (
    <div className="contact_s1">
      <p>CONTACT</p>
      <div className="article_container">
        <div className="sub_container">
          <div className="input_box">
            <p>
              프로젝트 용도 <sup>*</sup>
            </p>
            <select
              name="projectPurpose"
              value={projectPurpose}
              onChange={(e) => {
                handleInput(e, "projectPurpose");
              }}
              placeholder="선택해주세요."
            >
              <option value="" disabled>
                [필수] 선택해주세요.
              </option>
              <option value="option1">광고·홍보영상</option>
              <option value="option2">업종별영상</option>
              <option value="option3">제품영상</option>
              <option value="option4">교육영상</option>
              <option value="option5">행사영상</option>
              <option value="option6">중계</option>
              <option value="option7">온라인중계</option>
              <option value="option8">항공촬영</option>
              <option value="option9">CG</option>
              <option value="option10">애니메이션</option>
            </select>
          </div>
          <div className="input_box">
            <p>
              프로젝트 명 <sup>*</sup>
            </p>
            <input
              type="text"
              name="projectName"
              value={projectName}
              onChange={(e) => {
                handleInput(e, "projectName");
              }}
            />
          </div>
          <div className="input_box">
            <p>
              회사명 <sup>*</sup>
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
              당담자 성함 및 직함 <sup>*</sup>
            </p>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                handleInput(e, "name");
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
              제작예산 <sup>*</sup>
            </p>
            <input
              type="text"
              name="budget"
              value={budget}
              onChange={(e) => {
                handleInput(e, "budget");
              }}
            />
          </div>
          <div className="input_box">
            <p>
              제작일정 <sup>*</sup>
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
            <label for="file">
              <div class="upload_btn">
                <img src="/images/clip.png" alt="" />
                <p>
                  &nbsp;{selectedFileName || "파일첨부, 링크첨부 (최대20MB)"}
                </p>
              </div>
            </label>
            <input name="file" type="file" onChange={handleFileChange} />
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
        {check ? (
          <img
            src="/images/checked_btn.png"
            alt=""
            onClick={() => {
              setCheck(!check);
            }}
          />
        ) : (
          <img
            src="/images/unChecked_btn.png"
            alt=""
            onClick={() => {
              setCheck(!check);
            }}
          />
        )}

        <p>개인정보수집에 동의합니다.</p>
      </div>
      <div className="submit_btn">문의하기</div>
    </div>
  );
};

export default ContactS1;
