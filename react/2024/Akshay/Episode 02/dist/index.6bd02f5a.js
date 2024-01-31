const newElement = React.createElement("p", {
    "className": "para primary",
    "id": "welcomeTxt"
}, "Hello ", React.createElement("span", {}, "Adisivan"));
const rootElement = ReactDOM.createRoot(document.querySelector("#root"));
rootElement.render(newElement);

//# sourceMappingURL=index.6bd02f5a.js.map
