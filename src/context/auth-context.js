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
  const {setIsApiPending} = useVideo()
  const encodedToken = localStorage.getItem("userToken");
  const [isToken, setIsToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsToken((prev) => encodedToken);
  }, []);

  const getLogin = async (email, password) => {
    try {
      setIsApiPending(true)
      const response = await axios.post(LOGIN_API, {
        email: email,
        password: password,
      });
      setIsApiPending(false);
      localStorage.setItem("userToken", response.data.encodedToken);
      setIsToken(response.data.encodedToken);
      toast("Login Successfully! ");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    setIsToken((prev) => "");
    toast("Logout Successfully!");
  };
  return (
    <AuthContext.Provider value={{ getLogin, logoutHandler, isToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
