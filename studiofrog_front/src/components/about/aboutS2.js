import React, { useEffect, useRef } from "react";
const AboutS2 = () => {
  const tagRef1 = useRef(null);
  const tagRef2 = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowWidth = window.innerWidth;
      let triggerPosition;

      if (windowWidth <= 500) {
        triggerPosition = (90 * windowWidth) / 100; // 90vw in pixels
      } else {
        triggerPosition = (40 * windowWidth) / 100; // 120vw in pixels
      }

      if (
        scrollPosition >= triggerPosition &&
        tagRef1.current &&
        tagRef1.current
      ) {
        tagRef1.current.classList.add("animate1");
        tagRef2.current.classList.add("animate2");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="about_s2">
      <p id="pc" ref={tagRef1}>
        안녕하세요.
        <br />
        스튜디오프로그는 많은 영상들이 만들어지고 필요해지는 지금
        <br />
        진심을 담아 상담하고 편안한 업무과정에 만족할 수 있도록 노력하겠습니다.
      </p>
      <p id="mobile">
        안녕하세요.
        <br />
        <br />
        스튜디오프로그는 많은 영상들이 만들어지고 <br />
        필요해지는 지금 진심을 담아 상담하고 편안한 업무과정에 <br />
        만족할 수 있도록 노력하겠습니다.
      </p>
      <div className="article_container" ref={tagRef2}>
        <div className="article">
          <img src="/images/about_s2_img1.png" alt="" />
          <p>PLAN</p>
          <p>
            클라이언트가 원하는 아웃풋이 명확해질 수 있도록 다양한 레퍼런스를
            통해 커뮤니케이션 합니다.
          </p>
        </div>
        <div className="article">
          <img src="/images/about_s2_img2.png" alt="" />
          <p>FILM</p>
          <p>최고의 품질로 촬영하기 위해 크레에이티브 전문가가 촬영합니다.</p>
        </div>
        <div className="article">
          <img src="/images/about_s2_img3.png" alt="" />
          <p>EDIT</p>
          <p>
            가장 중요한 최종본을 위해 능숙한 에디터들이 편집, 디자인, 색보정을
            통해 영상을 연출합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutS2;
