import React, { useRef, useEffect } from "react";
const MainS2 = () => {
  const tagRef = useRef(null);
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
  return (
    <div className="main_s2">
      <p>
        <span>스튜디오 프로그</span>는 콘텐츠 안에 메시지가
        <br />
        담길 수 있도록 정직하고 투명한 업무를 약속합니다.
      </p>
      <img src="/images/main_s2.png" alt="" ref={tagRef} />
    </div>
  );
};

export default MainS2;
