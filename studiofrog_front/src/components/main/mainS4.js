import React, { useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { useSelector } from "react-redux";
const MainS4 = () => {
  const { lists } = useSelector((state) => state.videoList);
  const scrollContainerRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowWidth = window.innerWidth;
      let triggerPosition;

      if (windowWidth <= 550) {
        triggerPosition = (340 * windowWidth) / 100; // 90vw in pixels
      } else {
        triggerPosition = (120 * windowWidth) / 100; // 120vw in pixels
      }

      if (
        scrollPosition >= triggerPosition &&
        tagRef.current &&
        tagRef.current
      ) {
        tagRef.current.classList.add("animate1");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
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
          <div className="text_box" ref={tagRef}>
            <p>
              <span>스튜디오 프로그</span>는 기획부터 편집까지
            </p>
            <p>최고의 인력과 기획 능력을 통해 콘텐츠를 제공드립니다.</p>
          </div>
          <div className="scroll_container" ref={scrollContainerRef}>
            <div className="video_box_container">
              {lists &&
                lists.map((list, index) => {
                  return (
                    <div className="video_box" key={index}>
                      <YouTube
                        videoId={list.file_id}
                        opts={{
                          playerVars: {
                            rel: 0,
                            modestbranding: 1,
                            controls: 0,
                          },
                        }}
                        onEnd={(e) => {
                          e.target.stopVideo(0);
                        }}
                        style={{}}
                      />
                      <p>{list.file_title}</p>
                      <p>프로그 스튜디오</p>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* <p>
            <span>+</span> MORE
          </p> */}
        </div>
        <img
          id="pc"
          src="/images/right_btn.png"
          alt=""
          onClick={handleScrollRight}
        />
      </div>
    </div>
  );
};

export default MainS4;
