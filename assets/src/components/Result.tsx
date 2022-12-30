import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, CenteredField, Name } from "./common";
import type { Pet } from "../types";

const ResultCenteredField = styled(CenteredField)`
  width: 120rem;
  height: 40rem;
`;

const ResultField = styled.div`
  background-color: ${(props) => props.theme.colors.bgDark};
  padding: 3rem;
  border-radius: 25px;
  width: 100%;
  height: 25rem;
  display: flex;
  gap: 3rem;
`;

const Image = styled.img`
  max-width: auto;
  max-height: 100%;
  border-radius: 25px;
`;

const Text = styled.div`
  color: ${(props) => props.theme.colors.fontLight};
`;

const Description = styled.p`
  font-size: 2.5rem;
  text-align: center;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 2rem;
`;

const Loading = styled.i`
  font-family: ${(props) => props.theme.secondaryFont};
  color: ${(props) => props.theme.colors.fontDark};
`;

const ResultButton = styled(Button)`
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  background-color: ${(props) => (props.disabled ? props.theme.colors.bgDark : props.theme.colors.accent)};
  color: ${(props) => (props.disabled ? props.theme.colors.fontLight : props.theme.colors.fontDark)};
`;

const Result = () => {
  const [ranking, setRanking] = useState<Pet[]>();
  const [option, setOption] = useState<number>(0);

  useEffect(() => {
    let ignore = false;

    const fetchResult = async () => {
      try {
        const response = await fetch("/api/result");
        const json = await response.json();
        if (!ignore) {
          setRanking(json.data);
        }
      } catch (e) {
        console.error(`Fetching result data failed: ${e}`);
      }
    };

    fetchResult();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <ResultCenteredField>
      {ranking ? (
        <>
          <ResultField>
            <Image src={ranking[option].pictureUrl} alt={ranking[option].name} />
            <Text>
              <Name>{ranking[option].name}</Name>
              <Description>{ranking[option].description}</Description>
            </Text>
          </ResultField>
          <ButtonBox>
            <ResultButton disabled={option === 0} onClick={() => setOption(0)}>
              First choice
            </ResultButton>
            <ResultButton disabled={option === 1} onClick={() => setOption(1)}>
              Second choice
            </ResultButton>
            <ResultButton disabled={option === 2} onClick={() => setOption(2)}>
              Third choice
            </ResultButton>
          </ButtonBox>
        </>
      ) : (
        <Loading>Processing the data...</Loading>
      )}
    </ResultCenteredField>
  );
};

export default Result;
