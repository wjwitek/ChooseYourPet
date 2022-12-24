import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CriteriumBox from "./CriteriumBox";
import { CenteredField, Button } from "./common";
import type { Criterium } from "../types";

const IMPORTANCE_SCALE = [1 / 9, 1 / 7, 1 / 5, 1 / 3, 1, 3, 5, 7, 9];
const DEFAULT_VALUE_INDEX = 4;

const CompareCenteredField = styled(CenteredField)`
  width: 120rem;
  height: 40rem;
`;

const CriteriaArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dots = styled.div`
  display: flex;
  gap: 1rem;
`;

type DotProps = {
  pressedDot: number;
};

const Dot = styled.button<DotProps>`
  background-color: ${(props) =>
    props.pressedDot == props.value ? props.theme.colors.accent : props.theme.colors.bgDark};
  width: 6rem;
  height: 6rem;
  border: 5px solid ${(props) => props.theme.colors.bgDark};
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const Compare = () => {
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState<Criterium[]>();
  const [curCriterium, setCurCriterium] = useState<{ row: number; col: number }>({ row: 1, col: 0 });
  const [pressedDot, setPressedDot] = useState<number>(DEFAULT_VALUE_INDEX);
  const criteriaMatrix = useRef<number[][]>([[]]);
  const isLastIter = useMemo(() => {
    if (criteria) return curCriterium.col + 1 === criteria.length - 1 && curCriterium.row === criteria.length - 1;
  }, [criteria, curCriterium.col, curCriterium.row]);

  const getNextQuestion = useCallback(() => {
    if (curCriterium.col == 0) criteriaMatrix.current.push([]);
    criteriaMatrix.current[curCriterium.row].push(IMPORTANCE_SCALE[pressedDot]);
    setCurCriterium((prev) => {
      if (prev.col == prev.row - 1) {
        return { row: prev.row + 1, col: 0 };
      }
      return { ...prev, col: prev.col + 1 };
    });
    setPressedDot(DEFAULT_VALUE_INDEX);
  }, [curCriterium, pressedDot]);

  const submitCriteriaMatrix = useCallback(async () => {
    try {
      const response = await fetch("/api/compute", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ criteriaMatrix: criteriaMatrix }),
      });
      const location = response.headers.get("Location");
      if (location) navigate(location);
    } catch (e) {
      console.error(`Submiting criteria matrix failed: ${e}`);
    }
  }, [navigate]);

  useEffect(() => {
    let ignore = false;

    const fetchCriteria = async () => {
      try {
        const response = await fetch("/api/criteria");
        const json = await response.json();
        if (!ignore) {
          setCriteria(json.criteria);
        }
      } catch (e) {
        console.error(`Fetching criteria data failed: ${e}`);
        return;
      }
    };

    fetchCriteria();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <CompareCenteredField>
      {criteria && (
        <>
          <CriteriaArea>
            <CriteriumBox name={criteria[curCriterium.row].name} description={criteria[curCriterium.row].description} />
            <Dots>
              {IMPORTANCE_SCALE.map((value, index) => (
                <Dot
                  value={index}
                  key={value}
                  pressedDot={pressedDot}
                  onClick={() => {
                    setPressedDot(index);
                  }}
                />
              ))}
            </Dots>
            <CriteriumBox name={criteria[curCriterium.col].name} description={criteria[curCriterium.col].description} />
          </CriteriaArea>
          <Button
            onClick={() => {
              if (isLastIter) {
                submitCriteriaMatrix();
              } else {
                getNextQuestion();
              }
            }}
          >
            {isLastIter ? "Submit" : "Next question"}
          </Button>
        </>
      )}
    </CompareCenteredField>
  );
};

export default Compare;
