import React, { useState } from "react";
const ContactS1 = () => {
  const [projectPurpose, setProjectPurpose] = useState("");
  const [projectName, setProjectName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [period, setPeriod] = useState("");
  const handleInput = (e, inputType) => {
    if (inputType === "projectPurpose") {
      setProjectPurpose(e.target.value);
    }
  };
  return (
    <div className="contact_s1">
      <p>CONTACT</p>
      <div className="article_container">
        <div className="input_box">
          <p>
            프로젝트 용도 <sup>*</sup>
          </p>
          <input
            type="text"
            name="purpose"
            value={purpose}
            onChange={(e) => {
              handleInput(e, "projectPurpose");
            }}
          />
        </div>
        <div className="input_box">
          <p>
            프로젝트 용도 <sup>*</sup>
          </p>
          <input
            type="text"
            name="purpose"
            value={purpose}
            onChange={(e) => {
              handleInput(e, "purpose");
            }}
          />
        </div>
        <div className="input_box">
          <p>
            프로젝트 용도 <sup>*</sup>
          </p>
          <input
            type="text"
            name="purpose"
            value={purpose}
            onChange={(e) => {
              handleInput(e, "purpose");
            }}
          />
        </div>
        <div className="input_box">
          <p>
            프로젝트 용도 <sup>*</sup>
          </p>
          <input
            type="text"
            name="purpose"
            value={purpose}
            onChange={(e) => {
              handleInput(e, "purpose");
            }}
          />
        </div>
        <div className="input_box">
          <p>
            프로젝트 용도 <sup>*</sup>
          </p>
          <input
            type="text"
            name="purpose"
            value={purpose}
            onChange={(e) => {
              handleInput(e, "purpose");
            }}
          />
        </div>
        <div className="input_box">
          <p>
            프로젝트 용도 <sup>*</sup>
          </p>
          <input
            type="text"
            name="purpose"
            value={purpose}
            onChange={(e) => {
              handleInput(e, "purpose");
            }}
          />
        </div>
        <div className="input_box">
          <p>
            프로젝트 용도 <sup>*</sup>
          </p>
          <input
            type="text"
            name="purpose"
            value={purpose}
            onChange={(e) => {
              handleInput(e, "purpose");
            }}
          />
        </div>
        <div className="input_box">
          <p>
            프로젝트 용도 <sup>*</sup>
          </p>
          <input
            type="text"
            name="purpose"
            value={purpose}
            onChange={(e) => {
              handleInput(e, "purpose");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactS1;
