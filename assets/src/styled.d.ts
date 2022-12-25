import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundImage: string;
    mainFont: string;
    secondaryFont: string;
    colors: {
      fontDark: string;
      fontLight: string;
      bgDark: string;
      bgLight: string;
      accent: string;
      disabled: string;
    };
  }
}
