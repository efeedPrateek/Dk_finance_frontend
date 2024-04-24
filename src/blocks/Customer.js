import React from "react";
import { Typography, Box, Button, Paper, Grid } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { StyledTypography } from "../components/Common";


// Import JSON data using require()
const jsonData = require("../mocks/customers.json");

export const Customers = () => {
  const { appId } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  // Sample data
  const data = jsonData;
  const handleNavigate = (url) => {
    navigate(url);
  };
  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const addForm = (item) => {
    navigate("/applicant/customer/details", {
      state: { customerDetails: item },
    });
  };

  return (
    <>
      <Box width={"90%"} margin={"13vh auto 0 auto"}>
        <StyledTypography variant="subtitle1" weight={700}>
          Application ID: {appId}
        </StyledTypography>
       
        <Box display={"flex"}>
          <Button
            onClick={handleGoBack}
            startIcon={<ArrowBack />}
            variant="contained"
            style={{ marginBottom: 20 }}
          >
            GO BACK
          </Button>
          <Button
            variant="outlined"
            style={{ marginBottom: 20, marginLeft: "auto" }}
          >
            Forwarded to DM
          </Button>
        </Box>

        <Box>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
              gap: "1rem",
            }}
          >
            <Button onClick={() => handleNavigate("/applicant/loan")}>
              Loan Details
            </Button>
            <Button
              onClick={() => handleNavigate("/applicant/document/uploads")}
            >
              Document Upload
            </Button>
            <Button
              onClick={() => handleNavigate("/applicant/photographs/uploads")}
            >
              Photograph Upload
            </Button>
            <Button onClick={() => handleNavigate("/applicant/collateral")}>
              Collateral Details
            </Button>
            <Button
              onClick={() => handleNavigate("/applicant/customer/application")}
            >
              Customer Application Form
            </Button>
          </div>
        </Box>
      </Box>

      <Paper
        style={{
          width: "90%",
          overflowX: "auto",
          height: 400,
          margin: "auto",
          position: "relative",
          marginBottom: "1rem",
        }}
      >
        <Grid
          container
          style={{
            backgroundColor: "#f5f5f5",
            padding: 10,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Grid item xs={2}>
            <Typography variant="subtitle1">Customer Id</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Name</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">KYC</Typography>
          </Grid>
        </Grid>
        <div>
          {data.map((item, index) => (
            <Grid
              key={item.id}
              container
              style={{
                padding: 10,
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  index % 2 === 0 ? "#f9f9f9" : "#ffffff")
              }
              onClick={() => addForm(item)}
            >
              <Grid item xs={2}>
                <Typography variant="body1">{item.customerId}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">{item.name}</Typography>
              </Grid>

              <Grid item xs={2}>
                <Chip
                  label={item.kyc ? "Verified" : "Not Verified"}
                  color={item.kyc ? "primary" : "default"}
                />
              </Grid>
            </Grid>
          ))}
        </div>
      </Paper>
    </>
  );
};
