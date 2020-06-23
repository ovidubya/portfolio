// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    themeType: string;
    navSize: string;
    speed: string;
    colors: {
      body: string;
      text: string;
      earthy: string;
      pumpkin: string;
      lovelyBlue: string;
    };
    toggleBorder: string;
    gradient: string;
    font: {
      extraSmall: string;
      small: string;
      medium: string;
      mediumLarge: string;
      large: string;
      extraLarge: string;
    };
  }
}
