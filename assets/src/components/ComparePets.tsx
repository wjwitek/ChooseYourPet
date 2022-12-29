import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DEFAULT_VALUE_INDEX, IMPORTANCE_SCALE } from "../consts";
import { CenteredField, Button, CriteriaArea } from "./common";
import PetBox from "./PetBox";
import Dots from "./Dots";
import type { Criterium, Pet } from "../types";

const ComparePetsCenteredField = styled(CenteredField)`
  width: 120rem;
  height: 40rem;
`;

const DotsCriteriaWrapper = styled.div`
  color: ${(props) => props.theme.colors.fontDark};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const CriteriumText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

const CriteriumName = styled.h1`
  font-size: 3rem;
  text-align: center;
  line-height: 1rem;
`;

const CriteriumDescription = styled.p`
  font-size: 2rem;
  text-align: center;
`;

const ComparePets = () => {
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState<Criterium[]>();
  const [pets, setPets] = useState<Pet[]>();
  const [curPet, setCurPet] = useState<{ criterium: number; row: number; col: number }>({
    criterium: 0,
    row: 1,
    col: 0,
  });
  const [pressedDot, setPressedDot] = useState<number>(DEFAULT_VALUE_INDEX);
  const petsMatrices = useRef<number[][][]>([]);
  const isLastIter = useMemo(() => {
    if (pets && criteria)
      return (
        curPet.criterium === criteria.length - 1 && curPet.col + 1 === pets.length - 1 && curPet.row === pets.length - 1
      );
  }, [criteria, curPet, pets]);

  const addValueToMatrix = useCallback(() => {
    if (curPet.row === 1 && curPet.col == 0) {
        petsMatrices.current.push([[]]);
      }
      if (curPet.col === 0) {
        petsMatrices.current[curPet.criterium].push([]);
      }
      petsMatrices.current[curPet.criterium][curPet.row].push(IMPORTANCE_SCALE[pressedDot]);
  }, [curPet, pressedDot]);

  const getNextQuestion = useCallback(() => {
    setCurPet((prev) => {
      if (pets) {
        if (prev.col + 1 === pets.length - 1 && prev.row === pets.length - 1) {
          return { criterium: prev.criterium + 1, row: 1, col: 0 };
        }
        if (prev.col === prev.row - 1) {
          return { ...prev, row: prev.row + 1, col: 0 };
        }
        return { ...prev, col: prev.col + 1 };
      }
      return prev;
    });
    setPressedDot(DEFAULT_VALUE_INDEX);
  }, [pets]);

  const submitPetsMatricies = useCallback(async () => {
    console.log(petsMatrices)
    try {
      await fetch("/api/submit/pets", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: petsMatrices.current }),
      });
      navigate("/home");
    } catch (e) {
      console.error(`Submiting pets matrcies failed: ${e}`);
    }
  }, [navigate]);

  useEffect(() => {
    let ignore = false;

    const fetchData = async (
      url: string,
      setData:
        | React.Dispatch<React.SetStateAction<Criterium[] | undefined>>
        | React.Dispatch<React.SetStateAction<Pet[] | undefined>>
    ) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (json.data.length < 2) {
          throw "Data length must be greater than 1";
        }
        if (!ignore) {
          setData(json.data);
        }
      } catch (e) {
        console.error(`Fetching pet data failed: ${e}`);
        return;
      }
    };

    fetchData("/api/data/criteria", setCriteria);
    fetchData("/api/data/pets", setPets);

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <ComparePetsCenteredField>
      {pets && criteria && (
        <>
          <CriteriaArea>
            <PetBox name={pets[curPet.row].name} pictureUrl={pets[curPet.row].pictureUrl} />
            <DotsCriteriaWrapper>
              <CriteriumText>
                <CriteriumName>{criteria[curPet.criterium].name}</CriteriumName>
                <CriteriumDescription>{criteria[curPet.criterium].description}</CriteriumDescription>
              </CriteriumText>
              <Dots quantity={IMPORTANCE_SCALE.length} pressedDot={pressedDot} setPressedDot={setPressedDot} />
            </DotsCriteriaWrapper>
            <PetBox name={pets[curPet.col].name} pictureUrl={pets[curPet.col].pictureUrl} />
          </CriteriaArea>
          <Button
            onClick={() => {
              addValueToMatrix()
              if (isLastIter) {
                submitPetsMatricies();
              } else {
                getNextQuestion();
              }
            }}
          >
            {isLastIter ? "Submit" : "Next question"}
          </Button>
        </>
      )}
    </ComparePetsCenteredField>
  );
};

export default ComparePets;
