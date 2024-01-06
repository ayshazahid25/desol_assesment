// pages/login.js
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <h1 className="text-center mt-2">Login Page</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
