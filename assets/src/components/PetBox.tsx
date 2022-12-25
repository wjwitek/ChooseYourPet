import styled from "styled-components";
import { CriteriumBoxWrapper, Name } from "./common";

const Image = styled.img`
  max-width: 100%;
  max-height: auto;
  border-radius: 25px;
`;

type PetBoxProps = {
  name: string;
  pictureUrl: string;
};

const PetBox = ({ name, pictureUrl }: PetBoxProps) => {
  return (
    <CriteriumBoxWrapper>
      <Name>{name}</Name>
      <Image src={pictureUrl} alt={name} />
    </CriteriumBoxWrapper>
  );
};

export default PetBox;
