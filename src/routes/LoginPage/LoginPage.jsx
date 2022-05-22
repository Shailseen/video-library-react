import classNames from "classnames";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
export const LoginPage = () => {
  return (
    <>
      <div className={styles.login_container}>
        <h2>Login</h2>
        <div className={styles.input}>
          <input type="text" name="email" placeholder="Email address" />
        </div>
        <div className={styles.input}>
          <input type="text" name="password" placeholder="Password" />
        </div>
        <div className={styles.remember_container}>
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <div className={classNames(styles.btn_container,styles.flex_col_container)}>
          <button className="button-style-none solid-button">LOG IN</button>
          <button className="button-style-none solid-button">GUEST LOGIN</button>
        </div>
        <div className={styles.signup}>
            <label>Not a member? </label>
            <Link className={styles.signup_link} to="/">Register</Link>
        </div>
      </div>
    </>
  );
};
