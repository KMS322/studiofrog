import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { useSelector } from "react-redux";
const AboutS1 = () => {
  const { lists } = useSelector((state) => state.videoList);
  const aboutList = lists && lists.filter((list) => list.type === "about");
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
        <YouTube
          videoId={aboutList && aboutList.length && aboutList.file_id}
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
      </div>
    </div>
  );
};

export default AboutS1;
