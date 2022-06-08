import { Aside } from "./components/Asides/Aside";
import { MobileAside } from "./components/Asides/MobileAside/MobileAside";
import { Navbar } from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Modal from "./components/Modal/Modal";
import Loader from "./components/Loader/Loader";
import { useState } from "react";
import { useEffect } from "react";
import { useVideo } from "./context/videos-context";
function App() {
  const {isApiPending,setIsApiPending} = useVideo();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    isApiPending ? setIsOpen(true) : setIsOpen(false)
  },[isApiPending])
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
