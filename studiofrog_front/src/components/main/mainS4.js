import React, { useRef } from "react";
const MainS4 = () => {
  const scrollContainerRef = useRef(null);

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      // 현재 참조된 요소가 있는지 확인
      if (
        scrollContainerRef.current.scrollWidth >
        scrollContainerRef.current.clientWidth
      ) {
        const scrollDistance = 40.26; // 원하는 스크롤 이동 거리 (vw 단위)
        const pixelsToScroll = (scrollDistance * window.innerWidth) / 100; // vw를 px로 변환

        scrollContainerRef.current.scrollLeft += pixelsToScroll;
      }
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      if (scrollContainerRef.current.scrollLeft > 0) {
        const scrollDistance = 40.26; // Desired scroll distance (vw unit)
        const pixelsToScroll = (scrollDistance * window.innerWidth) / 100; // Convert vw to px

        scrollContainerRef.current.scrollLeft -= pixelsToScroll;
      }
    }
  };

  return (
    <div className="main_s4">
      <div className="article_container">
        <img src="/images/left_btn.png" alt="" onClick={handleScrollLeft} />
        <div className="article">
          <div className="text_box">
            <p>
              <span>스튜디오 프로그</span>는 기획부터 편집까지
            </p>
            <p>최고의 인력과 기획 능력을 통해 콘텐츠를 제공드립니다.</p>
          </div>
          <div className="scroll_container" ref={scrollContainerRef}>
            <div className="video_box_container">
              {Array.from({ length: 20 }, (_, index) => {
                return (
                  <div className="video_box" key={index}>
                    <img src="/images/main_s4_img1.jpg" alt="" />
                    <p>제품소개영상{index}</p>
                    <p>프로그 스튜디오</p>
                  </div>
                );
              })}
            </div>
          </div>
          <p>
            <span>+</span> MORE
          </p>
        </div>
        <img src="/images/right_btn.png" alt="" onClick={handleScrollRight} />
      </div>
    </div>
  );
};

export default MainS4;
