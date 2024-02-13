import React, { useState, useEffect, useRef } from "react";
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

  const tagRef1 = useRef(null);
  const tagRef2 = useRef(null);
  const tagRef3 = useRef(null);
  const tagRef4 = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowWidth = window.innerWidth;
      let triggerPosition1;
      let triggerPosition2;
      let triggerPosition3;
      let triggerPosition4;

      if (windowWidth <= 550) {
        triggerPosition1 = (360 * windowWidth) / 100;
        triggerPosition2 = (380 * windowWidth) / 100;
        triggerPosition3 = (380 * windowWidth) / 100;
        triggerPosition4 = (420 * windowWidth) / 100;
      } else {
        triggerPosition1 = (140 * windowWidth) / 100;
        triggerPosition2 = (140 * windowWidth) / 100;
        triggerPosition3 = (140 * windowWidth) / 100;
        triggerPosition4 = (170 * windowWidth) / 100;
      }

      if (
        scrollPosition >= triggerPosition1 &&
        tagRef1.current &&
        tagRef1.current
      ) {
        tagRef1.current.classList.add("animate1");
        tagRef2.current.classList.add("animate2");
        tagRef3.current.classList.add("animate2");
      }
      if (
        scrollPosition >= triggerPosition2 &&
        tagRef2.current &&
        tagRef2.current
      ) {
        tagRef2.current.classList.add("animate2");
      }
      if (
        scrollPosition >= triggerPosition3 &&
        tagRef3.current &&
        tagRef3.current
      ) {
        tagRef3.current.classList.add("animate2");
      }
      if (
        scrollPosition >= triggerPosition4 &&
        tagRef4.current &&
        tagRef4.current
      ) {
        tagRef4.current.classList.add("animate3");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="main_s5">
      <div className="article_container">
        <img src="/images/main_s5_img.jpg" alt="" />
        <p ref={tagRef1}>클라이언트가 필요로 하는</p>
        <p ref={tagRef2}>영상 업무를 수행하는 회사</p>
        <p ref={tagRef3}>
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
          <p ref={tagRef4} id="pc">
            많은 선택지 앞에서 가장 명확한 길을 추구합니다.
            <br />
            영상은, 스튜디오프로그.
          </p>
          <img id="mobile" src="/images/main_s5_img2_mobile.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default MainS5;
