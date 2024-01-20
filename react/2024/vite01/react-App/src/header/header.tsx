import React, { useState } from "react";

interface Props {
  jsonObj: any[];
  heading: string;
}

const Header = ({ jsonObj, heading }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <h5>{heading}</h5>
      {jsonObj.length === 0 && <p>No record found</p>}
      <ul className="list-group">
        {jsonObj.map((element, index) => (
          <li
            key={element.id}
            className={`list-group-item ${
              selectedIndex === index ? "active" : ""
            }`}
            onClick={() => setSelectedIndex(index)}
          >
            {element.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Header;
