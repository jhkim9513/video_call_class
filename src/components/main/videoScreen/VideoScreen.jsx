import React, { Component } from "react";
import { connect } from "react-redux";

class VideoScreen extends Component {
  /* ----------------- Methods  ----------------- */
  /* ----------------- LifeCycle  ----------------- */
  componentDidMount() {
    const { hasNickName, hasRoom } = this.props;
    if (!hasRoom || !hasNickName) {
      this.props.history.push("/");
    }
  }
  /* ----------------- Redner  ----------------- */
  render() {
    return (
      <div>
        <h1>Video Screen</h1>
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
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen);
