import "../css/adminUploadForm.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_LISTS_REQUEST } from "../reducers/videoList";

const AdminUploadForm = ({ handlePopup }) => {
  const dispatch = useDispatch();
  const [urls, setUrls] = useState([""]);
  const { addListsDone, lists } = useSelector((state) => state.videoList);
  useEffect(() => {
    if (addListsDone) {
      window.location.reload();
    }
  }, [lists]);
  const handleInput = (e, index) => {
    const newUrls = [...urls];
    newUrls[index] = e.target.value;
    setUrls(newUrls);
  };

  const addInput = () => {
    setUrls([...urls, ""]);
  };

  const removeInput = (index) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);
  };

  const sendData = async (e) => {
    e.preventDefault();

    dispatch({
      type: ADD_LISTS_REQUEST,
      data: { urls },
    });
  };
  return (
    <div className="adminUploadForm">
      <img src="/images/delete_btn.png" alt="" onClick={handlePopup} />
      <div className="form_container">
        {urls.map((url, index) => (
          <div className="input_container" key={index}>
            <input
              key={index}
              type="text"
              name={`url-${index}`}
              value={url}
              onChange={(e) => handleInput(e, index)}
              placeholder={`Youtube Url #${index + 1}을 입력해주세요.`}
            />
          </div>
        ))}
      </div>
      <div className="btn_box">
        <div className="list_btn" onClick={() => removeInput(urls.length - 1)}>
          삭제
        </div>
        <div className="list_btn" onClick={addInput}>
          추가
        </div>
      </div>

      <div className="submit_btn" onClick={sendData}>
        업로드
      </div>
    </div>
  );
};

export default AdminUploadForm;
