import React, { useState } from "react";
const MainS5 = () => {
  const importAll = (r) => {
    return r.keys().map(r);
  };
  const images = importAll(
    require.context("../../../public/logos/", false, /\.(png|jpe?g|svg)$/)
  );

  const [startIndex, setStartIndex] = useState(0);

  const handleClickNext = () => {
    if (startIndex + 5 < images.length) {
      setStartIndex(startIndex + 5);
    }
  };

  const handleClickPrev = () => {
    if (startIndex - 5 >= 0) {
      setStartIndex(startIndex - 5);
    }
  };
  return (
    <div className="main_s5">
      <div className="article_container">
        <img src="/images/main_s5_img.jpg" alt="" />
        <p>클라이언트가 필요로 하는</p>
        <p>영상 업무를 수행하는 회사</p>
        <p>
          <span>스튜디오 프로그</span>입니다.
        </p>
        <div className="logo_box_container">
          <img src="/images/left_btn.png" alt="" onClick={handleClickPrev} />
          <div className="logo_box">
            {images.slice(startIndex, startIndex + 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Client Logo ${index + startIndex}`}
              />
            ))}
          </div>
          <img src="/images/right_btn.png" alt="" onClick={handleClickNext} />
        </div>
        <div className="img_box">
          <img id="pc" src="/images/main_s5_img2.jpg" alt="" />
          <img id="mobile" src="/images/main_s5_img2_mobile.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default MainS5;
