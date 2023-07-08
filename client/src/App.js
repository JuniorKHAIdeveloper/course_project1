import React from "react";
import Root from "./Root";

export const AppContext = React.createContext();

function App() {
  const [type, setType] = React.useState("csv")
  const [file, setFile] = React.useState(null)

  return (
    <AppContext.Provider value={{type, setType, file, setFile}}>
      <Root />
    </AppContext.Provider>
  );
}

export default App;
