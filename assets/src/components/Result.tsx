import styled from "styled-components";

const Loading = styled.i`
  font-family: ${(props) => props.theme.secondaryFont};
  color: ${(props) => props.theme.colors.fontDark};
`;

const Result = () => {
  return <p>Result!</p>;
};

export default Result;
