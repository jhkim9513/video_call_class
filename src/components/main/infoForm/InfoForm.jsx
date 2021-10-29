import React, { PureComponent } from "react";
import {
  InfoFormTitleH1,
  InfoFormBtn,
  InfoFormDiv,
  InfoFormWrapper,
  InfoFormSubmitBtn,
  InfoFormInput,
} from "../../../styledComponents/main/infoForm/infoFormStyle";
import { connect } from "react-redux";
import { inputNickName, setNickName } from "../../../redux/user/actions";
import { inputRoomName, setRoomName } from "../../../redux/room/actions";

class InfoForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  inputNickNameRef = React.createRef();
  inputRoomNameRef = React.createRef();

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
    this.inputRoomNameRef.current.focus();
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
    } else {
      alert("닉네임과 입장하실 방 이름을 저장해주세요.");
    }
  };

  /* ----------------- LifeCycle  ----------------- */
  componentDidMount() {
    this.inputNickNameRef.current.focus();
  }

  /* ----------------- Redner  ----------------- */
  render() {
    console.log("I'm InfoForm.jsx!");
    const { nickName, roomName, hasNickName, hasRoom } = this.props;
    const isConnect = hasNickName && hasRoom ? true : false;
    return (
      <InfoFormWrapper onSubmit={(e) => this.onSubmit(e)}>
        <InfoFormDiv>
          <InfoFormTitleH1>닉네임</InfoFormTitleH1>
          <InfoFormInput
            type="text"
            value={nickName}
            onChange={(e) => this.inputNickName(e)}
            ref={this.inputNickNameRef}
          />
          <InfoFormBtn
            onClick={(e) => {
              this.saveNicKName(e);
            }}
            isComplete={hasNickName}
          >
            {hasNickName ? "완료" : "저장"}
          </InfoFormBtn>
        </InfoFormDiv>
        <InfoFormDiv>
          <InfoFormTitleH1>방이름</InfoFormTitleH1>
          <InfoFormInput
            type="text"
            value={roomName}
            onChange={(e) => this.inputRoomName(e)}
            ref={this.inputRoomNameRef}
          />
          <InfoFormBtn
            onClick={(e) => this.saveRoomName(e)}
            isComplete={hasRoom}
          >
            {hasRoom ? "완료" : "저장"}
          </InfoFormBtn>
        </InfoFormDiv>
        <InfoFormSubmitBtn isConnect={isConnect}>입장하기</InfoFormSubmitBtn>
      </InfoFormWrapper>
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
