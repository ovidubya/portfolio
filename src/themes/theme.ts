const globalColors = {
  earthy: "#27ae60",
  pumpkin: "#fa8231",
  wizardGray: "#535c68",
  lovelyBlue: "#686de0",
};

export const theme = {
  navSize: "60px",
  speed: "500ms",
  font: {
    extraSmall: "10px",
    small: "14px",
    medium: "16px",
    large: "24px",
    extraLarge: "42px",
  },
};

export const lightTheme = {
  themeType: "light",
  colors: {
    ...globalColors,
    body: "#E2E2E2",
    text: "#363537",
  },
  toggleBorder: "#FFF",
  gradient: "linear-gradient(#39598A, #79D7ED)",
  ...theme,
};

export const darkTheme = {
  themeType: "dark",
  colors: {
    ...globalColors,
    body: "#363537",
    text: "#FAFAFA",
  },
  toggleBorder: "#6B8096",
  gradient: "linear-gradient(#091236, #1E215D)",
  ...theme,
};
