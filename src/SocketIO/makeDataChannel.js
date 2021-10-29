import { setDataChannel } from "../redux/room/actions";
import store from "../redux/store";

function makeDataChannel() {
  let peerConnection = store.getState().roomReducer.peerConnection;
  let dataChannel;

  dataChannel = peerConnection.createDataChannel("chat");
  dataChannel.addEventListener("message", console.log);
  store.dispatch(setDataChannel(dataChannel));
  console.log("made data channel");
}

export default makeDataChannel;
