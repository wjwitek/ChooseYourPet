import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CenteredField, Button, Header } from "./common";
import { useCurrentExpert } from "../contexts/CurrentExpertContext";
import type { Available } from "../types";

const HomeCenteredField = styled(CenteredField)`
  width: 100rem;
  height: 60rem;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Text = styled.p`
  color: ${(props) => props.theme.colors.fontDark};
  width: 90%;
  margin: 0;
  text-align: center;
`;

const ButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 2.5rem 4rem;
`;

const ResultsButton = styled(Button)`
  grid-column: span 2;
  justify-self: center;
`;

const Home = () => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState<Available>({
    criteria: false,
    pets: false,
  });
  const resultsDisabled = useMemo(() => !available.criteria || !available.pets, [available]);
  const { currentExpert } = useCurrentExpert();

  useEffect(() => {
    let ignore = false;

    const fetchAvailable = async () => {
      try {
        const response = await fetch("/api/available");
        const json = await response.json();
        if (!ignore) {
          // "Unpacking" the json to get error if the structure is invalid
          setAvailable({ criteria: json.criteria, pets: json.pets });
        }
      } catch (e) {
        console.error(`Fetching available data failed: ${e}`);
      }
    };

    fetchAvailable();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <HomeCenteredField>
      <DescriptionContainer>
        <Header>Choose your pet!</Header>
        <Text>
          Answer to series of questions to find out what is the best pet for you using <b>Analytic Hierarchy Process</b>
          . Click the button below and select one of the dots between presented criteria - the closer the dot to the
          criterum the more important it is!
        </Text>
      </DescriptionContainer>
      <ButtonBox>
        <Button>Experts</Button>
        <Button disabled={!currentExpert} onClick={() => navigate("/compare/criteria")}>
          {available.criteria ? "Re-compare criteria" : "Compare criteria"}
        </Button>
        <Button disabled={!currentExpert} onClick={() => navigate("/compare/pets")}>
          {available.pets ? "Re-compare pets" : "Compare pets"}
        </Button>
        <Button disabled={!currentExpert} onClick={() => navigate("/consistency")}>
          Consistency
        </Button>
        <ResultsButton
          disabled={resultsDisabled}
          onClick={() => {
            if (!resultsDisabled) navigate("/result");
          }}
        >
          See results
        </ResultsButton>
      </ButtonBox>
    </HomeCenteredField>
  );
};

export default Home;
