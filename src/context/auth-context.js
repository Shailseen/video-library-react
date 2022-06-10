import { useContext, createContext, useState } from "react";
import axios from "axios";
import { LOGIN_API } from "../utils/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useVideo } from "./videos-context";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const { setIsApiPending } = useVideo();
  const encodedToken = localStorage.getItem("userToken");
  const [isToken, setIsToken] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsToken((prev) => encodedToken);
  }, []);

  const getLogin = async (email, password) => {
    try {
      setIsApiPending(true);
      const response = await axios.post(LOGIN_API, {
        email: email,
        password: password,
      });
      setIsApiPending(false);
      localStorage.setItem("userToken", response.data.encodedToken);
      setIsToken(response.data.encodedToken);
      console.log(response.data.foundUser)
      setUser(response.data.foundUser);
      toast.success(
        `Login Successfully, Welcome ${response.data.foundUser.firstName}`
      );
      navigate("/");
    } catch (error) {
      setIsApiPending(false);
      toast.error("Login failed!");
    }
  };

  const getSignUp = async ({ firstName, lastName, email, password }) => {
    try {
      console.log("insignup");
      setIsApiPending(true);
      const response = await axios.post("/api/auth/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      setIsApiPending(false);
      toast.success(`Signup succesfully, Welcome ${firstName}!`);
      localStorage.setItem("userToken", response.data.encodedToken);
      setIsToken(response.data.encodedToken);
      setUser(response.data.foundUser);
      navigate("/");
    } catch (error) {
      setIsApiPending(false);
      error.response.status === 422
        ? toast.info("Email already exist!")
        : toast.error(`Signup failed, try again ${firstName}`);
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    setIsToken((prev) => "");
    toast.success("Logout Successfully!");
  };
  return (
    <AuthContext.Provider
      value={{ getLogin, logoutHandler, isToken, getSignUp, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
