import React, { useState } from "react";
import styles from "./SignUp.module.css";
import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/index";

export const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getSignUp, isToken } = useAuth();
  const from = location.state?.from?.pathname || "/";
  const [isValidate, setIsValidate] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (isToken) {
      navigate(from, { replace: true });
    }
  }, [isToken]);

  useEffect(() => {
    if (
      formData.firstName !== "" &&
      formData.email !== "" &&
      formData.password !== ""
    )
      setIsValidate((prev) => true);
    else setIsValidate((prev) => false);
  }, [formData]);

  const signupHandler = (e) => {
    e.preventDefault();
    getSignUp(formData);
  };
  
  return (
    <>
      <div className={styles.login_container}>
        <h2>Signup</h2>
        <form>
          <div className={styles.input}>
            <input
              onChange={onChange}
              type="text"
              name="firstName"
              placeholder="First Name"
              required
            />
          </div>
          <div className={styles.input}>
            <input
              onChange={onChange}
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
          </div>
          <div className={styles.input}>
            <input
              onChange={onChange}
              type="text"
              name="email"
              placeholder="Email address"
              required
            />
          </div>
          <div className={styles.input}>
            <input
              onChange={onChange}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div
            className={classNames(
              styles.btn_container,
              styles.flex_col_container
            )}
          >
            <button
              type="submit"
              disabled={!isValidate}
              onClick={signupHandler}
              className={classNames(
                "button-style-none solid-button",
                isValidate ? styles.enabled : styles.disabled
              )}
            >
              SiGN UP
            </button>
          </div>
        </form>
        <div className={styles.signup}>
          <label>Already have an account? </label>
          <Link className={styles.signup_link} to="/login">
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};
