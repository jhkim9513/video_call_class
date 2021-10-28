import styled from "styled-components";

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const HeaderContainer = ({ children }) => {
  return <StyledHeaderContainer>{children}</StyledHeaderContainer>;
};

const StyledHeaderTitle = styled.h1`
  font-size: 2rem;
`;

export const HeaderTitle = ({ children }) => {
  return <StyledHeaderTitle>{children}</StyledHeaderTitle>;
};
