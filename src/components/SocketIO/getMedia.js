import { setMyStream } from "../../redux/room/actions";
import store from "../../redux/store";

async function getMedia(deviceId) {
  const initialConstrains = {
    audio: true,
    video: { facingMode: "user" },
  };
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    let myMediaStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? initialConstrains : cameraConstraints
    );

    store.dispatch(setMyStream(myMediaStream));
  } catch (e) {
    console.log(e);
  }
}

export default getMedia;
