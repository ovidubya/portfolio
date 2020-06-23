import { ToggleTheme } from "../src/components";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../src/themes/global";
import { lightTheme, darkTheme } from "../src/themes/theme";
import { useTheme } from "../src/hooks/useTheme";
import dynamic from "next/dynamic";

const Footer = dynamic(
  //@ts-ignore
  () => import("../src/components").then((mod) => mod.Footer),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <ToggleTheme theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Component {...pageProps} />
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
