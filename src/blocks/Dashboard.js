import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAppId } from "../redux/reducers/auth/auth-reducer";

import {
  NavigateBefore,
  NavigateNext,
  Search,
  SwapVert,
} from "@mui/icons-material";

import {
  Grid,
  Paper,
  Chip,
  TextField,
  Box,
  InputAdornment,
  styled,
  IconButton,
} from "@mui/material";
import { theme } from "../theme";
import { CommonChip, StyledTypography, sortingFilter } from "../components/Common";

import DashedImg from "../assets/images/dashed.png";
const useStyles = makeStyles((theme) => ({
  dashedImg: {
    width: "1200px",
    marginLeft: "3rem",
    [theme.breakpoints.down("lg")]: {
      width: "850px",
      marginLeft: "2rem",
    },
  },
  appLicantRows: {
    padding: "1rem 0 1rem 80px",
    display: "flex",
    gap: "7rem",
    alignItems: "center",
    cursor: "pointer",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem 0 1rem 40px",
    },
  },
  appLicantHeader: {
    padding: "1rem 0 1rem 80px",
    backgroundColor: theme.palette.lightSecondaryV2.main,
    display: "flex",
    gap: "7rem",
    alignItems: "center",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem 0 1rem 40px",
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    width: "320px",
    borderRadius: "8px",
    height: "40px",

    fontFamily: theme.typography.fontFamily,
    color: theme.palette.primary.main,
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.lightSecondaryV2.main,
      },
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.lightSecondaryV2.main}`,
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary.main,
  },
}));

const DashboardPage = () => {
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  // Inside your component

  const [page, setPage] = useState(1); // State to manage current page
  const [sort,setSort] = useState("1")

  useEffect(() => {
    console.log("page", page);
  }, [page]);
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1)); // Decrement page, but not less than 1
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1)); // Increment page, but not more than total pages
  };

  const handleSetSort = (item)=>setSort(item.id);

  const showCustomer = (item) => {
    dispatch(setAppId({ appId: item.id, type: "setAppId" }));
    navigate("/applicant/customers");
  };
 
  return (
    <Box
      width={"90%"}
      margin={"17vh auto 0 auto"}
      height={"800px"}
      backgroundColor={theme.palette.white.main}
      borderRadius={"16px"}
    >
      <Grid container>
        <Grid item xs={12}>
          <Box p={"2rem"}>
            {/* <StyledTypography style={{ fontWeight: 700 }}>Applications</StyledTypography> */}
            <StyledTypography variant="subtitle1" weight={700}>
              Applications
            </StyledTypography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box pl={"80px"}>
            <StyledTextField
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box pl={"80px"} mt={"24px"}>
            <Box display={"flex"} alignItems={"center"} gap={"2rem"}>
              <SwapVert
                style={{
                  backgroundColor: "white",
                  border: "2px solid #E4D6E2",
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  color: "#7A306D",
                }}
              />
              {sortingFilter.map((item) => {
                return (
                  <CommonChip
                    propFontSize={theme.typography.body2.fontSize}
                    propFontWeight={theme.typography.fontWeightSemiBold}
                    propColor={
                      sort === item.id ? item.selectedColor : item.color
                    }
                    propWidth={"200px"}
                    propHeight={"40px"}
                    propBorderRadius={"32px"}
                    propBackgroundColor={
                      sort === item.id ? item.selectedBgColor : item.bgColor
                    }
                    label={item.label}
                    handleClick={() => handleSetSort(item)}
                  />
                );
              })}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box pl={"80px"} mt={"24px"}></Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper
            style={{
              width: "100%",
              margin: "40px 0",
              position: "relative",
              borderRadius:"16px"
            }}
          >
            <Grid
              container
              className={classes.appLicantHeader}
            >
              <Grid item xs={2}>
                <StyledTypography variant="body2" weight={600}>
                  Application ID
                </StyledTypography>
              </Grid>
              <Grid item xs={2}>
                <StyledTypography variant="body2" weight={600}>
                  Name
                </StyledTypography>
              </Grid>

              <Grid
                item
                xs={2}
                style={{
                  display: "flex",
                  marginLeft: "auto",
                }}
              >
                <Box>
                  <StyledTypography variant="body2" weight={600}>
                    Status
                  </StyledTypography>
                </Box>
              </Grid>
            </Grid>
            <Box style={{ overflowY: "scroll" }} height={"583px"}>
              {userInfo?.map((item, index) => (
                <>
                  <Grid
                    key={item.id}
                    container
                    className={classes.appLicantRows}
                    onClick={() => showCustomer(item)}
                  >
                    <Grid item xs={2}>
                      <StyledTypography variant="body2"  weight={600}>
                        #{item.id}
                      </StyledTypography>
                    </Grid>
                    <Grid item xs={2}>
                      <StyledTypography variant="body2"  weight={600}>
                        {item.assignee}
                      </StyledTypography>
                    </Grid>

                    <Grid
                      item
                      xs={2}
                      style={{
                        display: "flex",
                        marginLeft: "auto",
                        marginRight: "52px",
                      }}
                    >
                      <Box>
                        <CommonChip
                          propFontSize={theme.typography.body2.fontSize}
                          propFontWeight={theme.typography.fontWeightRegular}
                          propColor={
                            item.status === "Pending"
                              ? theme.palette.primary.main
                              : item.status === "Completed"
                              ? "#00B02C"
                              : theme.palette.black.main
                          }
                          propWidth={"160px"}
                          propHeight={"40px"}
                          propBorderRadius={"8px"}
                          propBackgroundColor={
                            item.status === "Pending"
                              ? theme.palette.lightSecondaryV3.main
                              : item.status === "Completed"
                              ? "#EAF2EC"
                              : theme.palette.lightSecondaryV2.main
                          }
                          label={item.status}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <img src={DashedImg} className={classes.dashedImg} />
                  {/* <hr style={{margin:"0 30px", borderStyle: "dashed" , borderColor:"#E4D6E2"}} /> */}
                </>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* <Box display="flex" justifyContent="center">
        <IconButton onClick={handlePrevPage}>
          <NavigateBefore />
        </IconButton>
        <IconButton onClick={handleNextPage}>
          <NavigateNext />
        </IconButton>
      </Box> */}
    </Box>
  );
};

export default DashboardPage;
