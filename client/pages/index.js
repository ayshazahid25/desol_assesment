import React, { useEffect } from "react";
import { useRouter } from "next/router";
import AddCarForm from "./components/AddCarForm";
import { useAuth } from "@/context/AuthContext";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // If user is not authenticated and loading is false, redirect to login
    if (!isAuthenticated && !loading) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  return (
    <>
      <Layout>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-center mt-2">Add Car</h1>
            <AddCarForm />
          </>
        )}
      </Layout>
    </>
  );
}
