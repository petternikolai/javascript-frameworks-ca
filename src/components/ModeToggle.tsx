import { useEffect } from "react";
import { useColorScheme } from "@mui/joy/styles";

export function ModeToggle() {
  const { setMode } = useColorScheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setMode(mediaQuery.matches ? "dark" : "light");

    const listener = (event: MediaQueryListEvent) => {
      setMode(event.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [setMode]);

  return null;
}
