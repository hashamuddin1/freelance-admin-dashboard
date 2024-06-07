import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement);

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    console.log("token", token);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_V1}/api/adminKPI`,
          {
            headers: {
              "x-access-token": `${token}`,
            },
          }
        );
        console.log(response.data);
        if (response.data) {
          setData(response.data);
          console.log(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setError(error);
        setIsLoading(false);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <Grid item key={item} xs={12} md={12} lg={4}>
                  <Card>
                    <Skeleton
                      variant="rectangular"
                      height={150}
                      animation="wave"
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        <Skeleton width="80%" animation="wave" />
                      </Typography>
                      <Typography>
                        <Skeleton width="60%" animation="wave" />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </>
    );
  }

  if (data) {
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={4}>
                <Card sx={{ backgroundColor: "green", color: "white" }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Total Agent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      {data.data.fetchAllAgent}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={12} lg={4}>
                <Card sx={{ backgroundColor: "blue", color: "white" }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Total Client
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      {data.data.fetchAllClient}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Card sx={{ backgroundColor: "purple", color: "white" }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Total Project
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      {data.data.fetchAllOrder}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}
