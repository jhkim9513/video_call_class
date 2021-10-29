import styled from "styled-components";
import React from "react";
/* 
export const name = ({children}) => {
  return <>{children}</>;
}; 
*/

/* ----- h1 ----- */
const StyledInfoFormTitleH1 = styled.h1`
  font-size: 1.2rem;
`;

export const InfoFormTitleH1 = ({ children }) => {
  return <StyledInfoFormTitleH1>{children}</StyledInfoFormTitleH1>;
};

/* ----- button ----- */
const StyledInfoFormBtn = styled.button.attrs((props) => {
  return { onClick: props.onClick };
})`
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  color: ${({ isComplete }) =>
    isComplete ? "rgb(255, 255, 255)" : "rgb(180, 185, 200)"};
  background-color: ${({ isComplete }) =>
    isComplete ? "rgb(30, 30, 30)" : "rgb(80, 85,99)"};
  width: 20%;
  height: 50%;
`;

export const InfoFormBtn = ({ children, onClick, isComplete }) => {
  return (
    <StyledInfoFormBtn onClick={onClick} isComplete={isComplete}>
      {children}
    </StyledInfoFormBtn>
  );
};

const StyledInfoFormSubmitBtn = styled.button.attrs((props) => {
  return { onClick: props.onClick };
})`
  cursor: pointer;
  transition: all 250ms ease-in;
  transform: ${({ isConnect }) => (isConnect ? "scale(1.2)" : "scale(1)")};
  background: ${({ isConnect }) =>
    isConnect ? "rgb(80, 85,99)" : "transparent"};
  color: ${({ isConnect }) => (isConnect ? "white" : "black")};
`;

export const InfoFormSubmitBtn = ({ children, onClick, isConnect }) => {
  return (
    <StyledInfoFormSubmitBtn onClick={onClick} isConnect={isConnect}>
      {children}
    </StyledInfoFormSubmitBtn>
  );
};

/* ----- form ----- */
const StyledInfoFormWrapper = styled.form.attrs((props) => {
  return { onSubmit: props.onSubmit };
})`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InfoFormWrapper = ({ children, onSubmit }) => {
  return (
    <StyledInfoFormWrapper onSubmit={onSubmit}>
      {children}
    </StyledInfoFormWrapper>
  );
};

/* ----- div ----- */
const StyledInfoFormDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
`;

export const InfoFormDiv = ({ children }) => {
  return <StyledInfoFormDiv>{children}</StyledInfoFormDiv>;
};

/* ----- input ----- */
const StyledInfoFormInput = styled.input.attrs((props) => {
  return {
    value: props.value,
    onChange: props.onChange,
    ref: props.ref ? props.ref : null,
  };
})`
  margin: 0 0.5em;
  padding: 0.2em;
  border-radius: 5%;
`;

export const InfoFormInput = React.forwardRef((props, ref) => {
  const { children, onChange, value } = props;
  return (
    <StyledInfoFormInput
      value={value}
      onChange={onChange}
      ref={ref ? ref : null}
    >
      {children}
    </StyledInfoFormInput>
  );
});
