import React, { Component } from "react";
import { FormTitleH1 } from "../../../styledComponents/main/infoForm/infoFormStyle";
import { connect } from "react-redux";
import { inputNickName, setNickName } from "../../../redux/user/actions";
import { inputRoomName, setRoomName } from "../../../redux/room/actions";

class InfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /* ----------------- Methods  ----------------- */
  inputNickName(e) {
    const { dispatchInputNickName } = this.props;
    dispatchInputNickName(e.target.value);
  }

  saveNicKName(e) {
    const { dispatchSetNickName } = this.props;
    const { nickName } = this.props;
    e.preventDefault();
    dispatchSetNickName(nickName);
  }

  inputRoomName(e) {
    const { dispatchInputRoomName } = this.props;
    dispatchInputRoomName(e.target.value);
  }

  saveRoomName(e) {
    const { dispatchSetRoomName } = this.props;
    const { roomName } = this.props;

    e.preventDefault();
    dispatchSetRoomName(roomName);
  }

  onSubmit = (e) => {
    const { hasRoom, hasNickName } = this.props;
    e.preventDefault();
    if (hasRoom && hasNickName) {
      this.props.history.push("/loading");
    }
  };

  /* ----------------- LifeCycle  ----------------- */

  // componentDidMount() {
  //   const { hasRoom, hasNickName } = this.props;
  //   if (!hasRoom || !hasNickName) {
  //     this.props.history.push("/");
  //   }
  // }
  /* ----------------- Redner  ----------------- */
  render() {
    const { nickName, roomName } = this.props;
    console.log(this.props);

    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <div>
          <FormTitleH1>닉네임</FormTitleH1>
          <input
            type="text"
            value={nickName}
            onChange={(e) => this.inputNickName(e)}
          />
          <button onClick={(e) => this.saveNicKName(e)}>저장</button>
        </div>
        <div>
          <FormTitleH1>방 이름</FormTitleH1>
          <input
            type="text"
            value={roomName}
            onChange={(e) => this.inputRoomName(e)}
          />
          <button onClick={(e) => this.saveRoomName(e)}>저장</button>
        </div>
        <button>입장하기</button>
      </form>
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
  return {
    dispatchInputNickName: (text) => dispatch(inputNickName(text)),
    dispatchInputRoomName: (text) => dispatch(inputRoomName(text)),
    dispatchSetRoomName: (roomName) => dispatch(setRoomName(roomName)),
    dispatchSetNickName: (nickName) => dispatch(setNickName(nickName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoForm);
