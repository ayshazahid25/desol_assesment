// pages/login.js
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { useAuth } from "@/context/AuthContext";
import Loader from "./components/Loader";

const Login = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  console.log("isAuthenticated:", isAuthenticated, loading);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-center mt-2">Login Page</h1>
          <LoginForm />
        </div>
      )}
    </>
  );
};

export default Login;
