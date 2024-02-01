import React from "react";
import ReactDOM from "react-dom/client";

const reactElement = <span>Adisivan</span>;

const headingText = (
    <div>
        <h2>Hello {reactElement}</h2>
    </div>
);

const HeadingComponent = () => (
    <>
        {headingText}
        <p>Welcome to React learning</p>
    </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent/>);
