import "./App.css";
import React, { createContext, useState } from "react";
import Homepage from "./pages/homepage/index";
import ThemeButton from "./components/settheme/index";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="App" style={theme ? { backgroundColor: "#feb300" } : {}}>
        <ThemeButton />
        <Homepage />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
