import { RouterProvider } from "react-router-dom";
import { routers } from "./router";
import { ThemeProvider } from "@emotion/react";
import { useRecoilState } from "recoil";
import { modeState } from "./store";
import { theme } from "./styles/theme";

function App() {
  const [mode] = useRecoilState(modeState);

  return (
    <ThemeProvider theme={mode === "light" ? theme.light : theme.dark}>
      <RouterProvider router={routers} />
    </ThemeProvider>
  );
}

export default App;
