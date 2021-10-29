import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { clickCameraBtn, clickMuteBtn } from "../../../redux/room/actions";
import getCameras from "../../SocketIO/getCameras";
import startSocketNet from "../../SocketIO/startSocketNet";

class VideoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  myFaceRef = React.createRef();
  peerFaceRef = React.createRef();
  selectRef = React.createRef();
  /* ----------------- Methods  ----------------- */

  async printStream(deviceId) {
    const { myStream } = this.props;

    try {
      this.myFaceRef.current.srcObject = myStream;

      if (!deviceId) {
        await getCameras(this.selectRef);
      }
    } catch (e) {
      console.log(e);
    }
  }

  clickMuteBtn(e) {
    const { myStream } = this.props;
    const { dispatchClickMuteBtn } = this.props;
    e.preventDefault();

    myStream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));

    dispatchClickMuteBtn();
    console.log("clickMute!");
  }

  clickCameraBtn(e) {
    const { myStream } = this.props;
    const { dispatchClickCameraBtn } = this.props;
    e.preventDefault();

    myStream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));

    dispatchClickCameraBtn();
  }

  /* ----------------- LifeCycle  ----------------- */
  componentDidMount() {
    const { hasNickName, hasRoom } = this.props;
    if (!hasRoom || !hasNickName) {
      this.props.history.push("/");
      return;
    }
    this.printStream(null);
    startSocketNet(this.peerFaceRef);
  }

  /* ----------------- Redner  ----------------- */
  render() {
    console.log("I'm VideoScreen.jsx!");
    const { muteBtn, cameraBtn, roomName, myStream } = this.props;
    return (
      <div>
        <h1>Room : {roomName}</h1>
        <video
          ref={this.myFaceRef}
          autoPlay
          width="500px"
          height="500px"
        ></video>
        <video
          ref={this.peerFaceRef}
          autoPlay
          width="500px"
          height="500px"
        ></video>

        {myStream !== "don't have stream" && (
          <div>
            <button className="muteBtn" onClick={(e) => this.clickMuteBtn(e)}>
              {!muteBtn ? (
                <i className="fas fa-volume-up"></i>
              ) : (
                <i className="fas fa-volume-mute"></i>
              )}
            </button>
            <button
              className="cameraBtn"
              onClick={(e) => this.clickCameraBtn(e)}
            >
              {!cameraBtn ? (
                <i className="fas fa-video"></i>
              ) : (
                <i className="fas fa-video-slash"></i>
              )}
            </button>
            <select className="selectCamera" ref={this.selectRef}></select>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    nickName: state.userReducer.nickName,
    hasNickName: state.userReducer.hasNickName,
    roomName: state.roomReducer.roomName,
    hasRoom: state.roomReducer.hasRoom,
    myStream: state.roomReducer.myStream,
    muteBtn: state.roomReducer.muteBtn,
    cameraBtn: state.roomReducer.cameraBtn,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    dispatchClickMuteBtn: () => {
      dispatch(clickMuteBtn());
    },
    dispatchClickCameraBtn: () => {
      dispatch(clickCameraBtn());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen);
