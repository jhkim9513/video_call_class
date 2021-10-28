import React, { Component } from "react";
import { connect } from "react-redux";
import getMedia from "../SocketIO/getMedia";
import makeConnection from "../SocketIO/makeConnection";

class Loading extends Component {
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
    console.log("didUpdate!");
    console.log(`this.props : ${JSON.stringify(this.props)}`);
    if (myStream && !peerConnection) {
      makeConnection();
    }
    if (myStream && peerConnection) {
      this.props.history.push("/videoScreen");
    }
  }

  /* ----------------- Redner  ----------------- */
  render() {
    return <div>loading</div>;
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
