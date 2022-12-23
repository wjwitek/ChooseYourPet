import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundImage: string;
    colors: {
      backgroundMain: string;
    };
  }
}
