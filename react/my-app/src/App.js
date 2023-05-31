import Header from "./Header";
import Content from "./Content";
import Menu from "./Menu";
import Footer from "./Footer";

function App() {

  return (
    <div>
      <Header/>
      <section className="flex">
        <div className="w-full"><Content/></div>
        <div className="ml-auto w-auto"><Menu/></div>
      </section>
      <Footer/>
    </div>
  );

}

export default App;
