import Header from "./Header";
import Content from "./Content";
import Menu from "./Menu";
import Footer from "./Footer";

function App() {

  return (
    <div>
      <Header/>
      <section className="flex">
        <div><Content/></div>
        <div className="ml-auto"><Menu/></div>
      </section>
      <Footer/>
    </div>
  );

}

export default App;
