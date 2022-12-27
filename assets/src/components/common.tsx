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

type ButtonProps = {
  disabled?: boolean;
};

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => (props.disabled ? props.theme.colors.disabled : props.theme.colors.accent)};
  color: ${(props) => props.theme.colors.fontDark};
  font-family: ${(props) => props.theme.secondaryFont};
  font-size: 3rem;
  width: 18ch;
  padding: 1rem 1rem;
  border: 0;
  border-radius: 25px;
  box-shadow: 5px 5px 3px ${(props) => props.theme.colors.bgDark};
  transition: transform 0.3s;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    transform: ${(props) => (props.disabled ? "" : "translateY(-10px)")};
  }
`;

export const CriteriaArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CriteriumBoxWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.bgDark};
  color: ${(props) => props.theme.colors.fontLight};
  width: 20%;
  height: 28rem;
  border-radius: 25px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
`;

export const Name = styled.h1`
  font-family: ${(props) => props.theme.secondaryFont};
  font-size: 3rem;
  text-align: center;
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 2rem;
`;
