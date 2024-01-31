#In Javascript 

document.createElement("TAG_NAME");
TAG_NAME.setAttribute("ATTR_PROPERTY","ATTR_VALUE");
TAG_NAME.textContent("HELLO WORLD!");
document.appendChild("APPEND_WE_CREATED")


#In React
React.createElement("TAG_NAME",{"ATTR_PROPERTY":"ATTR_VALUE"},TEXT,CHILD_NODE IF REQUIRED);
ReactDOM.createRoot(Where we need to append it)
render it