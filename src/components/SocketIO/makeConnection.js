import { setPeerConnection } from "../../redux/room/actions";
import store from "../../redux/store";
const makeConnection = () => {
  // 서로 다른 사용자간의 연결을 위해 생성
  const tempMyPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });

  const myStream = store.getState().roomReducer.myStream;

  // 양쪽 브라우저에서 카메라, 마이크 데이터 stream을 받아서 구성  통상의 addStream 대신하는 작업
  myStream.getTracks().forEach((track) => {
    tempMyPeerConnection.addTrack(track, myStream);
  });

  store.dispatch(setPeerConnection(tempMyPeerConnection));
};

export default makeConnection;
