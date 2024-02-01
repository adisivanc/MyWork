import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

const defaultImgURL = "https://logodix.com/logo/2004001.png";

const App = () => (
  <>
    <Header imgURL={defaultImgURL}/>
    <Body/>
    <Footer/>
  </>
)

export default App;