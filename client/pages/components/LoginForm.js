import React, { useState } from "react";
import * as Yup from "yup";
import { Button, Container, TextField } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      // Validate using Yup schema
      await validationSchema.validate(data, { abortEarly: false });

      // Clear previous errors
      setErrors({});

      // Call login function
      await login(data);
      toast.success("Login successful!");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Yup validation error
        const yupErrors = {};
        error.inner.forEach((e) => {
          yupErrors[e.path] = e.message;
        });
        setErrors(yupErrors);
      } else {
        console.error("Login failed", error);
        toast.error("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />

        <Button
          type="submit"
          variant="outlined"
          fullWidth
          style={{ marginTop: 15 }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
