import React from "react";
import ReactDOM from 'react-dom/client';

const newElement = React.createElement(
    "p",
    {"className":"para primary","id":"welcomeTxt"},
    "Hello ",
    React.createElement("span",{},"Adisivan")
);
const rootElement = ReactDOM.createRoot(document.querySelector("#root"));
rootElement.render(newElement);