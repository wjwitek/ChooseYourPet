import { useEffect, useState } from "react";
import styled from "styled-components";
import { CenteredField, Header } from "./common";
import type { Consistencies, Criterium } from "../types";

const ConsistencyCenteredField = styled(CenteredField)`
  width: 60rem;
  height: 45rem;
`;

const ConsistencyHeader = styled(Header)`
  font-size: 5rem;
  margin-bottom: 3rem;
`;

const ScrollableContainer = styled.div`
  overflow-y: scroll;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ConsistencyBox = styled.div`
  color: ${(props) => props.theme.colors.fontLight};
  background-color: ${(props) => props.theme.colors.bgDark};
  border-radius: 25px;
  padding: 1rem 2rem;
  width: 80%;
`;

const Consistency = () => {
  const [criteria, setCriteria] = useState<Criterium[]>();
  const [consistency, setConsistency] = useState<Consistencies>({ criteria: null, pets: null });

  useEffect(() => {
    let ignore = false;

    const fetchData = async (
      url: string,
      setData: ((value: Criterium[] | undefined) => void) | ((value: Consistencies) => void)
    ) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (!ignore) {
          setData(json.data);
        }
      } catch (e) {
        console.error(`Fetching pet data failed: ${e}`);
        return;
      }
    };

    fetchData("/api/data/criteria", setCriteria);
    fetchData("/api/consistency", setConsistency);

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <ConsistencyCenteredField>
      <ConsistencyHeader>Consistency Ratios</ConsistencyHeader>
      <ScrollableContainer>
        <ConsistencyBox>{`Criteria: ${consistency.criteria ? consistency.criteria.toFixed(3) : "?"}`}</ConsistencyBox>
        {criteria &&
          criteria.map((value, index) => (
            <ConsistencyBox key={value.name}>
              {`${value.name}: ${consistency.pets ? consistency.pets[index].toFixed(3) : "?"}`}
            </ConsistencyBox>
          ))}
      </ScrollableContainer>
    </ConsistencyCenteredField>
  );
};

export default Consistency;
