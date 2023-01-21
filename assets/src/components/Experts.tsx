import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useExpert } from "../contexts/CurrentExpertContext";
import { CenteredField, Button, Header, SignButton } from "./common";

const MAX_NUMBER = 10;
const MIN_NUMBER = 1;

const ExpertsCenteredField = styled(CenteredField)`
  width: 80rem;
  height: 30rem;
`;

const ButtonContainer = styled.div`
  font-family: ${(props) => props.theme.mainFont};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`;

const NumberContainer = styled.div`
  background-color: ${(props) => props.theme.colors.bgDark};
  color: ${(props) => props.theme.colors.fontLight};
  border-radius: 25px;
  width: 6ch;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
`;

const ExpertsHeader = styled(Header)`
  font-size: 4rem;
`;

const Experts = () => {
  const navigate = useNavigate();
  const [expNumber, setExpNumber] = useState<number>(1);
  const { setMaxExperts } = useExpert();

  const submitMaxExperts = useCallback(async () => {
    try {
      await fetch("/api/experts", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: expNumber }),
      });
      setMaxExperts(expNumber);
      navigate("/home");
    } catch (e) {
      console.error(`Submiting maximum number of experts failed: ${e}`);
    }
  }, [navigate, expNumber, setMaxExperts]);

  return (
    <ExpertsCenteredField>
      <ExpertsHeader>Choose the maximum number of experts</ExpertsHeader>
      <ButtonContainer>
        <SignButton onClick={() => setExpNumber((prev) => (prev > MIN_NUMBER ? prev - 1 : prev))}>-</SignButton>
        <NumberContainer>{expNumber}</NumberContainer>
        <SignButton onClick={() => setExpNumber((prev) => (prev < MAX_NUMBER ? prev + 1 : prev))}>+</SignButton>
      </ButtonContainer>
      <Button onClick={() => submitMaxExperts()}>Submit</Button>
    </ExpertsCenteredField>
  );
};

export default Experts;
