import React, { useState, useEffect } from "react";
const AboutS1 = () => {
  const [changeText, setChangeText] = useState("");
  const content = [
    "창의적인",
    "모던한",
    "크리에이티브한",
    "감성적인",
    "역동적인",
    "심플한",
    "다채로운",
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
    <div className="about_s1">
      <p>ABOUT</p>
      <div className="text_box">
        <p>최선을 다해</p>
        <div className="change_box">
          <p>{changeText}</p>
        </div>
        <p>영상을 제작하겠습니다.</p>
      </div>
      <div className="video_box">
        <img src="/images/main_s4_img1.jpg" alt="" />
        <img src="/images/play_btn.png" alt="" />
      </div>
    </div>
  );
};

export default AboutS1;
