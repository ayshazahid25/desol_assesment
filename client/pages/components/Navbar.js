// components/Navbar.js
import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static" className="mb-2">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Car Service
        </Typography>
        {isAuthenticated && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
