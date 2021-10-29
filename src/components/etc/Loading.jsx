import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { LoadingDiv } from "../../styledComponents/etc/loadingStyle";
import getMedia from "../../SocketIO/getMedia";
import makeConnection from "../../SocketIO/makeConnection";

class Loading extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /* ----------------- Methods  ----------------- */

  /* ----------------- LifeCycle  ----------------- */
  componentDidMount() {
    const { hasNickName, hasRoom } = this.props;
    if (!hasRoom || !hasNickName) {
      this.props.history.push("/");
      return;
    }
    getMedia();
  }

  componentDidUpdate() {
    const { myStream, peerConnection } = this.props;
    if (myStream === "don't have stream") {
      makeConnection();
      this.props.history.push("/videoScreen");
      return;
    }
    if (myStream && !peerConnection) {
      makeConnection();
    }
    if (myStream && peerConnection) {
      this.props.history.push("/videoScreen");
    }
  }

  /* ----------------- Redner  ----------------- */
  render() {
    // console.log("I'm Loading.jsx!");
    return <LoadingDiv></LoadingDiv>;
  }
}

const mapStateToProps = (state, props) => {
  return {
    nickName: state.userReducer.nickName,
    hasNickName: state.userReducer.hasNickName,
    roomName: state.roomReducer.roomName,
    hasRoom: state.roomReducer.hasRoom,
    myStream: state.roomReducer.myStream,
    peerConnection: state.roomReducer.peerConnection,
  };
};

export default connect(mapStateToProps)(Loading);
