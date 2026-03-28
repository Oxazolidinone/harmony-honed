import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeName = "default" | "japanese" | "dark-fantasy";

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themeLabel: string;
}

const themeLabels: Record<ThemeName, string> = {
  default: "Cổ điển",
  japanese: "Nhật Bản cổ",
  "dark-fantasy": "Dark Fantasy",
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "default",
  setTheme: () => {},
  themeLabel: "Cổ điển",
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    return (localStorage.getItem("nhaccuatu-theme") as ThemeName) || "default";
  });

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    localStorage.setItem("nhaccuatu-theme", t);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeLabel: themeLabels[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};
