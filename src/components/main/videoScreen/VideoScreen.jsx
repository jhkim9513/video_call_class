import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { clickCameraBtn, clickMuteBtn } from "../../../redux/room/actions";
import {
  DeviceBtn,
  DeviceSelect,
  DeviceSettingBox,
  RoomTitleH1,
  Video,
  VideoBox,
  VideoScreenContainer,
  InputChatArea,
} from "../../../styledComponents/main/videoScreen/videoScreenStyle";
import getCameras from "../../../SocketIO/getCameras";
import startSocketNet from "../../../SocketIO/startSocketNet";
import makeDataChannel from "../../../SocketIO/makeDataChannel";
import { inputMyMessage, setPeerMessage } from "../../../redux/user/actions";

class VideoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  myFaceRef = React.createRef();
  peerFaceRef = React.createRef();
  selectRef = React.createRef();
  inputChatRef = React.createRef();
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

  isInputEnter(e) {
    const { dataChannel } = this.props;
    const { dispatchInputMyMessage } = this.props;

    if (e.key === "Enter") {
      console.log("Enter!!!");
      dataChannel.send(e.target.value);
      dispatchInputMyMessage("");
    }
  }

  inputMyMessage(e) {
    const { dispatchInputMyMessage } = this.props;
    dispatchInputMyMessage(e.target.value);
  }

  /* ----------------- LifeCycle  ----------------- */
  componentDidMount() {
    const { hasNickName, hasRoom } = this.props;
    if (!hasRoom || !hasNickName) {
      this.props.history.push("/");
      return;
    }
    this.printStream(null);
    makeDataChannel();
    startSocketNet(this.peerFaceRef);
  }

  componentDidUpdate() {
    const { myMessage, peerMessage } = this.props;
    const { dispatchSetPeerMessage } = this.props;
    if (peerMessage) {
      console.log(peerMessage);
      dispatchSetPeerMessage("");
    }
  }

  /* ----------------- Redner  ----------------- */
  render() {
    // console.log("I'm VideoScreen.jsx!");
    const { muteBtn, cameraBtn, roomName, myStream, myMessage } = this.props;
    return (
      <VideoScreenContainer>
        <RoomTitleH1>Room : {roomName}</RoomTitleH1>
        <VideoBox>
          <Video className="myFaceVideo" ref={this.myFaceRef}></Video>
          <InputChatArea
            ref={this.inputChatRef}
            onKeyDown={(e) => this.isInputEnter(e)}
            onChange={(e) => this.inputMyMessage(e)}
            value={myMessage}
          ></InputChatArea>
          <Video className="peerFaceVideo" ref={this.peerFaceRef}></Video>
        </VideoBox>

        {myStream !== "don't have stream" && (
          <DeviceSettingBox>
            <DeviceBtn
              className="muteBtn"
              onClick={(e) => this.clickMuteBtn(e)}
            >
              {!muteBtn ? (
                <i className="fas fa-volume-up"></i>
              ) : (
                <i className="fas fa-volume-mute"></i>
              )}
            </DeviceBtn>
            <DeviceBtn
              className="cameraBtn"
              onClick={(e) => this.clickCameraBtn(e)}
            >
              {!cameraBtn ? (
                <i className="fas fa-video"></i>
              ) : (
                <i className="fas fa-video-slash"></i>
              )}
            </DeviceBtn>
            <DeviceSelect
              className="selectCamera"
              ref={this.selectRef}
            ></DeviceSelect>
          </DeviceSettingBox>
        )}
      </VideoScreenContainer>
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
    dataChannel: state.roomReducer.dataChannel,
    myMessage: state.userReducer.myMessage,
    peerMessage: state.userReducer.peerMessage,
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
    dispatchSetPeerMessage: (peerMessage) => {
      dispatch(setPeerMessage(peerMessage));
    },
    dispatchInputMyMessage: (text) => {
      dispatch(inputMyMessage(text));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen);
