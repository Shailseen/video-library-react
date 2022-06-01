import { useContext, createContext, useState } from "react";
import axios from "axios";
import { LOGIN_API } from "../utils/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const encodedToken = localStorage.getItem("userToken");
  const [isToken, setIsToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsToken((prev) => encodedToken);
  }, []);

  const getLogin = async (email, password) => {
    try {
      console.log(email, password);
      const response = await axios.post(LOGIN_API, {
        email: email,
        password: password,
      });
      localStorage.setItem("userToken", response.data.encodedToken);
      setIsToken(response.data.encodedToken);
      toast("Login Successfully! ");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = (setLikeVideos) => {
    localStorage.clear();
    setIsToken((prev) => "");
    setLikeVideos(prev => []);
    toast("Logout Successfully!");
  };
  return (
    <AuthContext.Provider value={{ getLogin, logoutHandler, isToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
