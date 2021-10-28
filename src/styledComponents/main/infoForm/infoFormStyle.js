import styled from "styled-components";

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
  color: ${({ isComplete }) => (isComplete ? "blue" : "black")};
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

  transform: ${({ isConnect }) => (isConnect ? "scale(1.2)" : "scale(1)")};
  background: ${({ isConnect }) =>
    isConnect ? "rgb(174, 183, 226)" : "transparent"};
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
const StyledInfoFormContainer = styled.form.attrs((props) => {
  return { onSubmit: props.onSubmit };
})`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InfoFormContainer = ({ children, onSubmit }) => {
  return (
    <StyledInfoFormContainer onSubmit={onSubmit}>
      {children}
    </StyledInfoFormContainer>
  );
};

/* ----- div ----- */
const StyledInfoFormDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoFormDiv = ({ children }) => {
  return <StyledInfoFormDiv>{children}</StyledInfoFormDiv>;
};
