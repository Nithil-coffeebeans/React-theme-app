import React, { createContext, useContext, useState } from "react";
import "./styles/theme.scss"; // Import SCSS

// Theme context definition
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Theme toggle button
const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={`theme-button ${theme}`}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

// Main page component
const Page: React.FC = () => {
  return (
    <div>
      <h1>Theme Toggle Example</h1>
      <ThemeToggleButton />
    </div>
  );
};

// App component with ThemeProvider
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
};

export default App;
