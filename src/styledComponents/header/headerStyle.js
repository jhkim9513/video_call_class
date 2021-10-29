import styled from "styled-components";
/* 
export const name = ({children}) => {
  return <>{children}</>;
}; 
*/

/* ----- div ----- */
const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const HeaderContainer = ({ children }) => {
  return <StyledHeaderContainer>{children}</StyledHeaderContainer>;
};

/* ----- h1 ----- */
const StyledHeaderTitle = styled.h1`
  font-size: 2rem;
`;

export const HeaderTitle = ({ children }) => {
  return <StyledHeaderTitle>{children}</StyledHeaderTitle>;
};
