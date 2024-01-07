import React, { createContext, useMemo, useState, useCallback } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setCurrentUser = (userData) => {
    const token = userData.token.access;
    localStorage.setItem("token", token);
    const usr = userData.user.full_name;

    localStorage.setItem("user", usr);
    setUser(usr);
  };

  const getCurrentUser = () => {
    const authToken = localStorage.getItem("token");
    if (user) {
      return user;
    }
    if (!authToken) {
      return null;
    }
    // const usr = authToken ? jwtDecode(authToken) : null;
    // if (usr) {
    //   usr.roles = usr.roles !== "" ? usr.roles.replace(" ", "").split(",") : [];
    // }
    // return usr;
  };

  const loggoff = (callBack) => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    callBack();
  };

  //   const isUserAuthernticated = useCallback(() => {
  //     const authToken = localStorage.getItem("token");
  //     if (!authToken || authToken === "") {
  //       return false;
  //     }
  // const expDate = user ? user?.exp : jwtDecode(authToken).exp;
  //     const dateNow = new Date();
  //     const expiry = new Date(expDate * 1000);
  //     if (expiry < dateNow) {
  //       setUser(null);
  //       localStorage.removeItem("user");
  //       localStorage.removeItem("token");
  //       return false;
  //     }
  //     return true;
  //   }, [user, setUser]);

  const value = useMemo(
    () => ({
      user,
      //  isUserAuthernticated,
      setCurrentUser,
      getCurrentUser,
      loggoff,
    }),
    [
      user,
      // isUserAuthernticated
    ]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
