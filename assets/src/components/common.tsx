import styled from "styled-components";

export const CenteredField = styled.div`
  background-color: ${(props) => props.theme.colors.bgLight};
  font-size: 3rem;
  padding: 5rem;
  border-radius: 25px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  /* Centering the div */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.fontDark};
  font-family: ${(props) => props.theme.secondaryFont};
  font-size: 3rem;
  padding: 1rem 2rem;
  border: 0;
  border-radius: 25px;
  box-shadow: 5px 5px 3px ${(props) => props.theme.colors.bgDark};
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
  }
`;
