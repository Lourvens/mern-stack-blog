import { createContext, ReactNode, useEffect, useState } from "react";

type theme = {
  theme: "light" | "dark";
  updateTheme: (value: theme["theme"]) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const themeContext = createContext<theme | undefined>(undefined);

type Prop = {
  children: ReactNode[] | ReactNode;
};

export function ThemeProvider({ children }: Prop) {
  const [theme, updateTheme] = useState<theme["theme"]>("light");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") as theme["theme"];
    const systemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (localTheme) {
      theme != localTheme && updateTheme(localTheme);
    } else if (systemDarkTheme.matches && theme != "dark") {
      console.log("system theme");
      updateTheme("dark");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (theme == "dark") {
      document.documentElement.dataset.theme = "dark";
    } else {
      document.documentElement.dataset.theme = "light";
    }
    // save the theme in localstorage everytime is changed
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </themeContext.Provider>
  );
}
