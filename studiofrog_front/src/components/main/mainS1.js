import YouTube from "react-youtube";
import { useSelector } from "react-redux";
const MainS1 = () => {
  const { lists } = useSelector((state) => state.videoList);
  const mainList = lists && lists.filter((list) => list.type === "main");
  return (
    <div className="main_s1">
      <YouTube
        videoId={mainList && mainList.length && mainList.file_id}
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
