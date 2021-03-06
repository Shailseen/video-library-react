import classNames from "classnames";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/index";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  const { getLogin, isToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailHandler = (event) => {
    setEmail((prev) => event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword((prev) => event.target.value);
  };

  const guestLoginHandler = () => {
    getLogin("shailesh@gmail.com", "Shailesh123");
  };

  useEffect(() => {
    if (isToken) {
      navigate(from, { replace: true });
    }
  }, [isToken]);

  return (
    <>
      <div className={styles.login_container}>
        <h2>Login</h2>
        <div className={styles.input}>
          <input
            onChange={(e) => emailHandler(e)}
            type="text"
            name="email"
            placeholder="Email address"
          />
        </div>
        <div className={styles.input}>
          <input
            onChange={(e) => passwordHandler(e)}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className={styles.remember_container}>
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <div
          className={classNames(
            styles.btn_container,
            styles.flex_col_container
          )}
        >
          <button
            onClick={() => getLogin(email, password)}
            className="button-style-none solid-button"
          >
            LOG IN
          </button>
          <button
            onClick={() => guestLoginHandler()}
            className="button-style-none solid-button"
          >
            GUEST LOGIN
          </button>
        </div>
        <div className={styles.signup}>
          <label>Not a member? </label>
          <Link className={styles.signup_link} to="/signup">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};
