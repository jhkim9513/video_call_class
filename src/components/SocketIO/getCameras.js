import store from "../../redux/store";

async function getCameras(selectRef) {
  try {
    const myStream = store.getState().roomReducer.myStream;
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream?.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      selectRef.current.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

export default getCameras;
