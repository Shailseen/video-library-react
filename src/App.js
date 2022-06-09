import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Aside, MobileAside, Loader, Navbar, Modal } from "./components/index";
import { useVideo } from "./context/index";
import styles from "./App.module.css";

function App() {
  const { isApiPending } = useVideo();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    isApiPending ? setIsOpen(true) : setIsOpen(false);
  }, [isApiPending]);
  return (
    <div className={styles.app}>
      <Modal open={isOpen}>
        <Loader />
      </Modal>
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
