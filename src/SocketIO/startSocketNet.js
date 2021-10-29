import io from "socket.io-client";
import { setDataChannel, setPeerConnection } from "../redux/room/actions";
import store from "../redux/store";
import { setPeerMessage } from "../redux/user/actions";

function startSocketNet(peerFaceRef) {
  const socket = io("http://localhost:8080", {
    widthCredentials: true,
  });
  let roomName = store.getState().roomReducer.roomName;
  let peerConnection = store.getState().roomReducer.peerConnection;
  let dataChannel = store.getState().roomReducer.dataChannel;

  console.log(`dataChannel: ${dataChannel}`);
  socket.emit("join_room", roomName);

  // Socket cdoe
  console.log(`roomName : ${roomName}`);
  console.log(`peerConnection : ${peerConnection}`);
  // on("welcome")은 peerA측에서 돌아가는 코드
  socket.on("welcome", async () => {
    // 방에 누군가 접속했을 때 offer를 생성한다.
    // 생성된 offer에는 sdp라는 다른 브라우저가 참가할 수 있는 초대장?이 있다.
    const offer = await peerConnection.createOffer();
    // offer를 가지고나면 이 offer로 연결을 구성해야한다.
    peerConnection.setLocalDescription(offer);
    store.dispatch(setPeerConnection(peerConnection));

    /* peerA가 방장이라면 peerB가 접속했을 때 peerA가 offer를 생성하고
      setLocalDescription하고 이 offer를 peerB로 보낸다.
    */
    socket.emit("offer", offer, roomName);
    console.log("sent the offer");
    // 비디오와 오디오를 전달하는데에는 서버가 필요업지만 offer를 주고받기 위해서는 서버가 필요하다.
  });

  // on("offer")는 peerB측에서 돌아가는 코드
  socket.on("offer", async (offer) => {
    peerConnection.addEventListener("datachannel", (e) => {
      dataChannel = e.channel;
      dataChannel.addEventListener("message", (e) => {
        store.dispatch(setPeerMessage(e.data));
      });
      store.dispatch(setDataChannel(dataChannel));
    });

    console.log("received the offer");
    // 전달 받은 offer로 remoteDescription 설정
    peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    // answer를 setLocal하고
    peerConnection.setLocalDescription(answer);
    store.dispatch(setPeerConnection(peerConnection));
    // offer에 대한 답을 answer로 해야하므로
    socket.emit("answer", answer, roomName);
    console.log("sent the answer");
  });

  // on("answer")는 peerA측에서 돌아가는 코드
  socket.on("answer", (answer) => {
    peerConnection.addEventListener("datachannel", (e) => {
      dataChannel = e.channel;
      dataChannel.addEventListener("message", (e) => {
        store.dispatch(setPeerMessage(e.data));
      });
      store.dispatch(setDataChannel(dataChannel));
    });

    peerConnection.setRemoteDescription(answer);
    store.dispatch(setPeerConnection(peerConnection));
    console.log("received the answer");
  });

  socket.on("ice", async (ice) => {
    /* TypeError: Failed to execute 'addIceCandidate' on 'RTCPeerConnection':
 Candidate missing values for both sdpMid and sdpMLineIndex */
    if (ice) {
      //위 에러를 해결하기 위함
      await peerConnection.addIceCandidate(ice);
    }
    store.dispatch(setPeerConnection(peerConnection));
    console.log("received candidate");
  });

  const handleIce = (data) => {
    // candidate는 브라우저가 소통하는 방법을 알려주는것
    // peerA와 peerB가 icecandidate 이벤트로 생성한 candidate들을 서로 주고 받음
    socket.emit("ice", data.candidate, roomName);
    console.log("sent candidate");
  };

  function handleAddStream(data) {
    // const peersVideoRef = document.querySelector(".peersFace");
    peerFaceRef.current.srcObject = data.stream;
  }

  peerConnection.addEventListener("icecandidate", handleIce);
  peerConnection.addEventListener("addstream", handleAddStream);
  store.dispatch(setPeerConnection(peerConnection));
}

export default startSocketNet;
