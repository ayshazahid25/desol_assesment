import React, { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
  Grid,
} from "@mui/material";
import { useEffect, useRef } from "react";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6062";

const AddCarForm = () => {
  const [carModel, setCarModel] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [maxPictures, setMaxPictures] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);

  useEffect(() => {
    // Reset file input value when pictures exceed the limit or error occurs
    if (errors.pictures) {
      fileInputRef.current.value = "";
    }
  }, [errors.pictures]);

  const validationSchema = Yup.object({
    carModel: Yup.string()
      .min(3, "Must be at least 3 characters")
      .required("Required"),
    price: Yup.number().required("Required"),
    phoneNumber: Yup.string()
      .length(11, "Must be exactly 11 characters")
      .required("Required"),
    maxPictures: Yup.number()
      .min(1, "Must be at least 1")
      .max(10, "Must be at most 10")
      .required("Required"),
    pictures: Yup.array().max(
      Yup.ref("maxPictures"),
      `You can upload at most ${Yup.ref("maxPictures")} pictures.`
    ),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      carModel,
      price,
      phoneNumber,
      maxPictures,
      pictures,
    };

    try {
      // Validate using Yup schema
      await validationSchema.validate(data, { abortEarly: false });

      // Clear previous errors
      setErrors({});

      const formData = new FormData();
      formData.append("carModel", carModel);
      formData.append("price", price);
      formData.append("phoneNumber", phoneNumber);
      formData.append("maxPictures", maxPictures);

      pictures.forEach((file) => {
        formData.append(`pictures`, file);
      });

      const authToken = localStorage.getItem("userToken");

      const response = await axios.post(
        `${API_BASE_URL}/api/cars/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            boundary: `${formData.getBoundary()}`,
            "x-auth-token": authToken,
          },
        }
      );
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Yup validation error
        const yupErrors = {};
        error.inner.forEach((e) => {
          yupErrors[e.path] = e.message;
        });
        setErrors(yupErrors);
      } else {
        console.error("Form submission failed", error);
        // Handle other errors
      }
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > maxPictures) {
      setErrors({
        ...errors,
        pictures: `You can upload at most ${maxPictures} pictures.`,
      });
      setPictures([]);
    } else {
      setPictures(files);
      setErrors({
        ...errors,
        pictures: undefined,
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="carModel"
          name="carModel"
          label="Car Model"
          variant="outlined"
          margin="normal"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          error={Boolean(errors.carModel)}
          helperText={errors.carModel}
        />

        <TextField
          fullWidth
          id="price"
          name="price"
          label="Price"
          type="number"
          variant="outlined"
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={Boolean(errors.price)}
          helperText={errors.price}
        />

        <TextField
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          variant="outlined"
          margin="normal"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber}
        />

        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(errors.maxPictures)}
        >
          <TextField
            id="maxPictures"
            name="maxPictures"
            label="Max Number of Pictures"
            type="number"
            value={maxPictures}
            onChange={(e) => setMaxPictures(e.target.value)}
          />
          <FormHelperText>{errors.maxPictures}</FormHelperText>
        </FormControl>

        <input
          ref={fileInputRef}
          type="file"
          name="pictures"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        {errors.pictures && (
          <Typography color="error">{errors.pictures}</Typography>
        )}

        {pictures.length > 0 && (
          <div>
            <Typography variant="h6">Image Preview:</Typography>
            <Grid container spacing={2}>
              {pictures.map((file, index) => (
                <Grid item key={index} xs={6} sm={3} md={2} lg={3}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    width="100%"
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        )}

        <Button
          type="submit"
          variant="outlined"
          fullWidth
          style={{ marginTop: 15 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default AddCarForm;
