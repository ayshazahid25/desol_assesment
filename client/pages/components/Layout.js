// components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import { useAuth } from "@/context/AuthContext";

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      {children}
    </>
  );
};

export default Layout;
