import styled from "styled-components";
import { CriteriumBoxWrapper, Name } from "./common";

const Description = styled.p`
  font-size: 2rem;
  text-align: center;
`;

type CriteriumBoxProps = {
  name: string;
  description: string;
};

const CriteriumBox = ({ name, description }: CriteriumBoxProps) => {
  return (
    <CriteriumBoxWrapper>
      <Name>{name}</Name>
      <Description>{description}</Description>
    </CriteriumBoxWrapper>
  );
};

export default CriteriumBox;
