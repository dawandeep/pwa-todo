import "./App.css";
import { Header } from "./Components/Header/Header";
import Tasks from "./Components/Tasks/Tasks";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <Header />
      <Tasks />
      <Footer/>
    </div>
  );
}

export default App;
