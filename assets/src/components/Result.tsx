import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, CenteredField, Name } from "./common";
import type { Pet } from "../types";

const ResultCenteredField = styled(CenteredField)`
  width: 120rem;
  height: 55rem;
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
  const [ranking, setRanking] = useState<{ evm: Pet[] | null; gmm: Pet[] | null }>({ evm: null, gmm: null });
  const [method, setMethod] = useState<"evm" | "gmm">("evm");
  const [option, setOption] = useState<number>(0);

  useEffect(() => {
    let ignore = false;

    const fetchResult = async () => {
      try {
        const response = await fetch("/api/result");
        const json = await response.json();
        if (!ignore) {
          setRanking({ evm: json.data.evm, gmm: json.data.gmm });
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
      <ButtonBox>
        <ResultButton disabled={method === "evm"} onClick={() => setMethod("evm")}>
          EVM
        </ResultButton>
        <ResultButton disabled={method === "gmm"} onClick={() => setMethod("gmm")}>
          GMM
        </ResultButton>
      </ButtonBox>
      {ranking.evm && ranking.gmm ? (
        <>
          <ResultField>
            <Image src={ranking[method]![option].pictureUrl} alt={ranking[method]![option].name} />
            <Text>
              <Name>{ranking[method]![option].name}</Name>
              <Description>{ranking[method]![option].description}</Description>
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
