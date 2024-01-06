// pages/allCars.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import CarCard from "./components/CarCard";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import { Button, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6062";

const AllCars = () => {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [loader, setLoader] = useState(true);
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("userToken");
        // Check if the user is authenticated before making the request
        if (isAuthenticated) {
          //set loading
          setLoader(true);
          const response = await axios.get(`${API_BASE_URL}/api/cars`, {
            headers: {
              "x-auth-token": authToken,
            },
          });
          setCars(response.data);
        } else {
          if (!loading) {
            router.push("/login");
          }
          // If not authenticated, redirect to the login page
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [isAuthenticated, loading]);

  return (
    <Layout>
      <Container>
        <div className="mb-2">
          <h1 className="text-center mt-2">All Cars</h1>
          {isAuthenticated && (
            <Button
              type="submit"
              variant="outlined"
              style={{ marginTop: 15, marginBottom: 15 }}
              onClick={() => router.push("/")}
            >
              Add Car
            </Button>
          )}
          {loader ? (
            <Loader />
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {cars.map((car) => (
                <Grid item key={car._id} xs={12} sm={6} md={4} lg={3}>
                  <CarCard car={car} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default AllCars;
