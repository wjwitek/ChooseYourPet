import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CenteredField, Button, ButtonBox } from "./common";
import type { Available } from "../types";

const HomeCenteredField = styled(CenteredField)`
  width: 110rem;
  height: 45rem;
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

const Home = () => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState<Available>({
    criteria: false,
    pets: false,
  });
  const resultsDisabled = useMemo(() => !available.criteria || !available.pets, [available]);

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
        <Button onClick={() => navigate("/compare/criteria")}>
          {available.criteria ? "Re-compare criteria" : "Compare criteria"}
        </Button>
        <Button onClick={() => navigate("/compare/pets")}>{available.pets ? "Re-compare pets" : "Compare pets"}</Button>
        <Button
          disabled={resultsDisabled}
          onClick={() => {
            if (!resultsDisabled) navigate("/result");
          }}
        >
          See results
        </Button>
      </ButtonBox>
    </HomeCenteredField>
  );
};

export default Home;
