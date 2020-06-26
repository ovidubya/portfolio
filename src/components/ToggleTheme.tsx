import * as React from "react";
import styled from "styled-components";
import BrightnessLow from "../icons/brightness_low.svg";
import BrightnessHigh from "../icons/brightness_high.svg";

type ToggleThemeProps = {
  theme: string;
  toggleTheme: Function;
};

export const ToggleTheme: React.FC<ToggleThemeProps> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <ThemeIcon
      aria-label="Toggle Light and Dark Theme"
      onClick={() => {
        toggleTheme();
      }}
    >
      <span>{theme === "dark" ? <BrightnessLow /> : <BrightnessHigh />}</span>
    </ThemeIcon>
  );
};

const ThemeIcon = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background-color: transparent;
  -webkit-appearance: none;
  & svg {
    width: 30px;
    height: 30px;
    fill: ${(props) => props.theme.colors.text};
  }
`;
