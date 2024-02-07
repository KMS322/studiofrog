import YouTube from "react-youtube";

const MainS1 = () => {
  return (
    <div className="main_s1">
      <YouTube
        videoId="u_MPVjh3D5M"
        opts={{
          playerVars: {
            autoplay: 1,
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
  );
};

export default MainS1;
