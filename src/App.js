import { Aside } from "./components/Asides/Aside";
import { MobileAside } from "./components/Asides/MobileAside/MobileAside";
import { Navbar } from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
function App() {
  return (
    <div className={styles.app}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.aside}>
        <Aside />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
      <div className={styles.mobile}>
        <MobileAside />
      </div>
    </div>
  );
}

export default App;
