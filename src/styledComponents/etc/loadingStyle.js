import styled, { keyframes } from "styled-components";

/* 
export const name = ({children}) => {
  return <>{children}</>;
}; 
*/

const rotate = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

/* ----- div ----- */
const StyledLoadingDiv = styled.div`
  width: 5em;
  height: 5em;
  border-radius: 50%;
  border: 2px solid wheat;
  border-top: 2px solid black;
  animation: ${rotate} 2s linear infinite;
`;

export const LoadingDiv = ({ children }) => {
  return <StyledLoadingDiv>{children}</StyledLoadingDiv>;
};
