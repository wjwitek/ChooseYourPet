import styled from "styled-components";

const CenteredField = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundMain};
  font-size: 3rem;
  width: 50rem;
  height: 20rem;
  border-radius: 25px;
  box-shadow: 5px 5px 5px #555555;

  /* Centering the div */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const Welcome = () => {
  return (
    <CenteredField>
      <p>Welcome!</p>
    </CenteredField>
  );
};

export default Welcome;
