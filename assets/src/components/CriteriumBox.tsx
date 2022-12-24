import styled from "styled-components";

const StyledCriteriumBox = styled.div`
  background-color: ${(props) => props.theme.colors.bgDark};
  color: ${(props) => props.theme.colors.fontLight};
  width: 20%;
  height: 25rem;
  border-radius: 25px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Name = styled.h1`
  font-family: ${(props) => props.theme.secondaryFont};
  font-size: 3rem;
`;

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
    <StyledCriteriumBox>
      <Name>{name}</Name>
      <Description>{description}</Description>
    </StyledCriteriumBox>
  );
};

export default CriteriumBox;
