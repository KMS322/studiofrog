import "../../css/portfolio.css";
import "../../css/portfolio_mobile.css";
import React, { useState, useEffect } from "react";
const Portfolio = () => {
  const [changeText, setChangeText] = useState("");
  const content = [
    "기업홍보영상",
    "소셜미디어영상",
    "행사·공연영상",
    "온·오프라인중계",
    "제품영상",
    "광고·홍보",
    "커머스영상",
    "항공영상",
    "CG영상",
  ];
  useEffect(() => {
    let currentIndex = 0;
    const updateText = () => {
      setChangeText(content[currentIndex]);

      currentIndex = (currentIndex + 1) % content.length;

      setTimeout(updateText, 2000);
    };

    updateText();
    return () => clearTimeout(updateText);
  }, []);
  return (
    <div className="portfolio">
      <p>PORTFOLIO</p>
      <div className="text_box">
        <p>최선을 다해</p>
        <div className="change_box">
          <p>{changeText}</p>
        </div>
        <p>영상을 제작하겠습니다.</p>
      </div>
      <p>#업무영역</p>
      <div className="hash_box">
        <p>#기업홍보영상</p>
        <p>#소셜미디어영상</p>
        <p>#행사·공연영상</p>
        <p>#온·오프라인중계</p>
        <p>#제품영상</p>
        <p>#광고·홍보</p>
        <p>#커머스영상</p>
        <p>#항공영상</p>
        <p>#CG영상</p>
      </div>
      <div className="article_container">
        <div className="article">
          <img src="/images/main_s4_img1.jpg" alt="" />
          <p>회사소개영상</p>
          <p>프로그스튜디오</p>
        </div>
        <div className="article">
          <img src="/images/main_s4_img1.jpg" alt="" />
          <p>회사소개영상</p>
          <p>프로그스튜디오</p>
        </div>
        <div className="article">
          <img src="/images/main_s4_img1.jpg" alt="" />
          <p>회사소개영상</p>
          <p>프로그스튜디오</p>
        </div>
        <div className="article">
          <img src="/images/main_s4_img1.jpg" alt="" />
          <p>회사소개영상</p>
          <p>프로그스튜디오</p>
        </div>
        <div className="article">
          <img src="/images/main_s4_img1.jpg" alt="" />
          <p>회사소개영상</p>
          <p>프로그스튜디오</p>
        </div>
        <div className="article">
          <img src="/images/main_s4_img1.jpg" alt="" />
          <p>회사소개영상</p>
          <p>프로그스튜디오</p>
        </div>
      </div>
      <div className="btn_box">
        <p>More View</p>
        <img src="/images/more_btn.png" alt="" />
      </div>
    </div>
  );
};

export default Portfolio;
