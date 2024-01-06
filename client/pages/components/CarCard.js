// components/CarCard.js
import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

const CarCard = ({ car }) => {
  if (!car) {
    return null;
  }
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={car.pictures[0]}
        alt={car.carModel}
        style={{ objectFit: "cover", height: "140px" }}
      />
      <CardContent>
        <Typography variant="h5">{car.carModel}</Typography>
        <Typography variant="body2">Price: ${car.price}</Typography>
        <Typography variant="body2">Phone Number: {car.phoneNumber}</Typography>

        {car.pictures.length > 1 && (
          <div style={{ display: "flex", marginTop: "8px" }}>
            {car.pictures.slice(1, 4).map((picture, index) => (
              <img
                key={index}
                src={picture}
                alt={`${car.carModel} - ${index + 1}`}
                style={{ width: "50px", height: "auto", marginLeft: "4px" }}
              />
            ))}
          </div>
        )}
        {/* Display User Information */}
        <div style={{ marginTop: "8px" }}>
          <Typography variant="subtitle2">Owner:</Typography>
          <Typography variant="body2">Name: {car.user.full_name}</Typography>
          <Typography variant="body2">Email: {car.user.email}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
