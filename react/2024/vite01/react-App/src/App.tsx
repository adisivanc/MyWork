import React from "react";
import Header from "./header/header";

const App: React.FC = () => {
  let jsonObj = [
    {
      id: 832566,
      name: "Anbarasu",
      age: "16/04/1990",
    },
    {
      id: 832567,
      name: "Adisivan",
      age: "25/10/1990",
    },
    {
      id: 832568,
      name: "Masani",
      age: "01/09/1990",
    },
  ];

  return (
    <>
      <Header jsonObj={jsonObj} heading="Cities" />
    </>
  );
};

export default App;
