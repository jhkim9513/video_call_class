import styled from "styled-components";
import React from "react";
/* 
export const name = ({children}) => {
  return <>{children}</>;
}; 
*/

/* ----- h1 ----- */
const StyledRoomTitleH1 = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;
export const RoomTitleH1 = ({ children }) => {
  return <StyledRoomTitleH1>{children}</StyledRoomTitleH1>;
};

/* ----- div ----- */
const StyledVideoScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const VideoScreenContainer = ({ children }) => {
  return <StyledVideoScreenContainer>{children}</StyledVideoScreenContainer>;
};

const StyledVideoBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
`;
export const VideoBox = ({ children }) => {
  return <StyledVideoBox>{children}</StyledVideoBox>;
};

const StyledDeviceSettingBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 250px;
`;
export const DeviceSettingBox = ({ children }) => {
  return <StyledDeviceSettingBox>{children}</StyledDeviceSettingBox>;
};

/* ----- video ----- */
const StyledVideo = styled.video.attrs((props) => {
  const { ref } = props;
  return {
    ref: ref,
    autoPlay: true,
    width: "500px",
    height: "500px",
  };
})``;
export const Video = React.forwardRef((props, ref) => {
  return <StyledVideo ref={ref}>{props.children}</StyledVideo>;
});

/* ----- button ----- */
const StyledDeviceBtn = styled.button.attrs((props) => {
  const { onClick } = props;
  return { onClick };
})`
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
export const DeviceBtn = ({ children, onClick }) => {
  return <StyledDeviceBtn onClick={onClick}>{children}</StyledDeviceBtn>;
};

/* ----- select ----- */
const StyledDeviceSelect = styled.select.attrs((props) => {
  const { ref } = props;
  return {
    ref,
  };
})``;
export const DeviceSelect = React.forwardRef((props, ref) => {
  const { children } = props;
  return <StyledDeviceSelect ref={ref}>{children}</StyledDeviceSelect>;
});
