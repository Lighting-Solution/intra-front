import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";

const App = () => {
  const [currentChat, setCurrentChat] = useState(null);

  const routing = useRoutes(ThemeRoutes(setCurrentChat, currentChat));

  return <div className="dark">{routing}</div>;
};

export default App;
