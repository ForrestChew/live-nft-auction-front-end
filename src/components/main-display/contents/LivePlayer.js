import ReactHlsPlayer from "@panelist/react-hls-player";
import "./LivePlayer.css";

const LivePlayer = () => {
  return (
    <div>
      <ReactHlsPlayer
        src="http://192.168.0.13:8080/hls/stream.m3u8"
        autoPlay={true}
        controls={true}
        width="100%"
        height="575px"
      />
      <p className="video-player-paragraph">
        Live NFT Auction Contract Address:
        0xDccd679d62BF9B35c4c72DD91754e7CE486AE7Bb
      </p>
    </div>
  );
};

export default LivePlayer;
