import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMPORTANCE_SCALE, DEFAULT_VALUE_INDEX } from "../consts";
import { CenteredField, Button, CriteriaArea } from "./common";
import CriteriumBox from "./CriteriumBox";
import Dots from "./Dots";
import type { Criterium } from "../types";

const CompareCriteriaCenteredField = styled(CenteredField)`
  width: 120rem;
  height: 40rem;
`;

const CompareCriteria = () => {
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState<Criterium[]>();
  const [curCriterium, setCurCriterium] = useState<{ row: number; col: number }>({ row: 1, col: 0 });
  const [pressedDot, setPressedDot] = useState<number>(DEFAULT_VALUE_INDEX);
  const criteriaMatrix = useRef<number[][]>([[]]);
  const isLastIter = useMemo(() => {
    if (criteria) return curCriterium.col + 1 === criteria.length - 1 && curCriterium.row === criteria.length - 1;
  }, [criteria, curCriterium]);

  const getNextQuestion = useCallback(() => {
    if (curCriterium.col == 0) {
      criteriaMatrix.current.push([]);
    }
    criteriaMatrix.current[curCriterium.row].push(IMPORTANCE_SCALE[pressedDot]);

    setCurCriterium((prev) => {
      if (prev.col === prev.row - 1) {
        return { row: prev.row + 1, col: 0 };
      }
      return { ...prev, col: prev.col + 1 };
    });
    setPressedDot(DEFAULT_VALUE_INDEX);
  }, [curCriterium, pressedDot]);

  const submitCriteriaMatrix = useCallback(async () => {
    try {
      await fetch("/api/submit/criteria", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: criteriaMatrix.current }),
      });
      navigate("/home");
    } catch (e) {
      console.error(`Submiting criteria matrix failed: ${e}`);
    }
  }, [navigate]);

  useEffect(() => {
    let ignore = false;

    const fetchCriteria = async () => {
      try {
        const response = await fetch("/api/data/criteria");
        const json = await response.json();
        if (json.data.length < 2) {
          throw "Criteria data length must be greater than 1";
        }
        if (!ignore) {
          setCriteria(json.data);
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
    <CompareCriteriaCenteredField>
      {criteria && (
        <>
          <CriteriaArea>
            <CriteriumBox name={criteria[curCriterium.row].name} description={criteria[curCriterium.row].description} />
            <Dots quantity={IMPORTANCE_SCALE.length} pressedDot={pressedDot} setPressedDot={setPressedDot} />
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
    </CompareCriteriaCenteredField>
  );
};

export default CompareCriteria;
