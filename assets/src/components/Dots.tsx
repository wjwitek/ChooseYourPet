import styled from "styled-components";

const DotsWrapper = styled.div`
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

type DotsProps = {
  quantity: number;
  pressedDot: number;
  setPressedDot: React.Dispatch<React.SetStateAction<number>>;
};

const Dots = ({ quantity, pressedDot, setPressedDot }: DotsProps) => {
  return (
    <DotsWrapper>
      {new Array(quantity).fill(undefined).map((_, index) => (
        <Dot
          value={index}
          key={index}
          pressedDot={pressedDot}
          onClick={() => {
            setPressedDot(index);
          }}
        />
      ))}
    </DotsWrapper>
  );
};

export default Dots;
