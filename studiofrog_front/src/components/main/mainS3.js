import React, { useRef, useEffect } from "react";
const MainS3 = () => {
  const tagRef1 = useRef(null);
  const tagRef2 = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowWidth = window.innerWidth;
      let triggerPosition1;
      let triggerPosition2;

      if (windowWidth <= 500) {
        triggerPosition1 = (90 * windowWidth) / 100; // 90vw in pixels
        triggerPosition2 = (700 * windowWidth) / 100; // 130vw in pixels
      } else {
        triggerPosition1 = (80 * windowWidth) / 100; // 120vw in pixels
        triggerPosition2 = triggerPosition1; // tagRef2 will be animated at the same scroll position as tagRef1
      }

      if (
        scrollPosition >= triggerPosition1 &&
        tagRef1.current &&
        tagRef2.current
      ) {
        tagRef1.current.classList.add("animate1");
      }

      if (scrollPosition >= triggerPosition2 && tagRef2.current) {
        tagRef2.current.classList.add("animate2");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="main_s3">
      <img
        className="left_logo"
        src="/images/animation_logo.png"
        alt=""
        ref={tagRef1}
      />
      <div className="article_container">
        <div className="article">
          <p>MEDIA WORK</p>
          <img src="/images/main_s3_img1.png" alt="" />
          <div className="text_box_container">
            <div className="text_box">
              <div className="title_box">
                <p>기업홍보영상</p>
                <p>소셜미디어영상</p>
                <p>행사,공연영상</p>
                <p>온, 오프라인중계</p>
                <p>제품영상</p>
                <p>광고,홍보</p>
                <p>커머스영상</p>
                <p>항공영상</p>
                <p>CG영상</p>
              </div>
              <div className="content_box">
                <p>A Corporate Promotional Video</p>
                <p>Social Media Video</p>
                <p>A Video Of An Event Or Performance</p>
                <p>Online And Offline Broadcasts</p>
                <p>Product Video</p>
                <p>Advertising, Public Relations</p>
                <p>Commerce Video</p>
                <p>An Aerial Image</p>
                <p>CG Image</p>
              </div>
            </div>
          </div>
        </div>
        <div className="article">
          <p>DESIGN WORK</p>
          <img src="/images/main_s3_img2.png" alt="" />
          <div className="text_box_container">
            <div className="text_box">
              <div className="title_box">
                <p>기업홍보영상</p>
                <p>소셜미디어영상</p>
                <p>행사,공연영상</p>
                <p>온, 오프라인중계</p>
                <p>제품영상</p>
              </div>
              <div className="content_box">
                <p>Brand Design</p>
                <p>Illustration Design</p>
                <p>Animation Design</p>
                <p>Sound Design</p>
                <p>Brand Communication</p>
              </div>
            </div>
          </div>
        </div>
        <div className="article">
          <p>SOFT WORK</p>
          <img src="/images/main_s3_img3.png" alt="" />
          <div className="text_box_container">
            <div className="text_box">
              <div className="title_box">
                <p>홈페이지 제작</p>
                <p>영상제작자동화 시스템</p>
                <p>언리얼엔진기반 설계</p>
                <p>3D 설계</p>
              </div>
              <div className="content_box">
                <p>Home Page Production</p>
                <p>Video Production Automation System</p>
                <p>Unreal Engine-Based Design</p>
                <p>3D Design</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="right_logo"
        src="/images/animation_logo2.png"
        alt=""
        ref={tagRef2}
      />
    </div>
  );
};

export default MainS3;
