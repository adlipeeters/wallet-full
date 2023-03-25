import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const Accounts = () => {
  const arr = [1, 2, 3];
  return (
    <div style={{ background: "pink" }}>
      {arr.map((id) => {
        return (
          <>
            <Card sx={{ maxWidth: 345, borderRadius: "15px" }} key={id}>
              <CardContent
                sx={{
                  backgroundImage:
                    "linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: "white" }}
                >
                  Revolut
                  <AttachMoneyIcon sx={{ float: "right" }} />
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "white" }}
                >
                  Balance: 100$
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small">History</Button>
              </CardActions>
            </Card>
          </>
        );
      })}
    </div>
  );
};
