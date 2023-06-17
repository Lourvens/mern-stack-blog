import { themeContext } from "@/features/theme";
import { useContext } from "react";

function useTheme() {
  const contextValue = useContext(themeContext);

  if (!contextValue) throw new Error("theme context is undefined");

  const toggleTheme = () => {
    if (contextValue.theme == "light") contextValue.updateTheme("dark");
    else contextValue.updateTheme("light");
  };

  return {
    theme: contextValue.theme,
    updateTheme: contextValue.updateTheme,
    toggleTheme,
  };
}

export default useTheme;
