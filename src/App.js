
import { Aside } from "./components/Asides/Aside";
import { MobileAside } from "./components/Asides/MobileAside/MobileAside";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar/>
      <Aside/>
      <MobileAside/>
     </div>
  );
}

export default App;
