import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CenteredField, Button } from "./common";

const WelcomeCenteredField = styled(CenteredField)`
  width: 70rem;
  height: 50rem;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Header = styled.h1`
  font-family: ${(props) => props.theme.secondaryFont};
  color: ${(props) => props.theme.colors.fontDark};
  margin: 0;
  font-size: 7rem;
  font-weight: 600;
`;

const Text = styled.p`
  color: ${(props) => props.theme.colors.fontDark};
  width: 90%;
  margin: 0;
  text-align: center;
`;

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <WelcomeCenteredField>
      <DescriptionContainer>
        <Header>Choose your pet!</Header>
        <Text>
          Answer to series of questions to find out what is the best pet for you using <b>Analytic Hierarchy Process</b>
          . Click the button below and select one of the dots between presented criteria - the closer the dot to the
          criterum the more important it is to you!
        </Text>
      </DescriptionContainer>
      <Button onClick={() => navigate("/compare")}>{"Let's get started!"}</Button>
    </WelcomeCenteredField>
  );
};

export default Welcome;
