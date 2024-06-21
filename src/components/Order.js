import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import "../App.css";

export default function Order() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const columns = [
        { field: "title", headerName: "Title", width: 150 },
        { field: "description", headerName: "Description", width: 200 },
        { field: "status", headerName: "Status", width: 150 },
        { field: "price", headerName: "Price", width: 150 },
        {
            field: "agentId",
            headerName: "Agent Name",
            width: 150,
            renderCell: (params) => params.row.agentId.fullName,
        },
        {
            field: "clientId",
            headerName: "Client Name",
            width: 150,
            renderCell: (params) => params.row.clientId.fullName,
        },
    ];

    const SkeletonTable = () => (
        <div style={{ height: 450, width: "100%" }}>
            {[...Array(10)].map((_, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                    <Skeleton variant="rectangular" height={30} animation="wave" />
                </div>
            ))}
        </div>
    );

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL_V1}/api/getAllOrder`,
                    {
                        headers: {
                            "x-access-token": `${token}`,
                        },
                    }
                );
                if (response.data) {
                    setData(response.data.data);
                    console.log(response.data.data);
                    setIsLoading(false);
                }
            } catch (error) {
                setError(error);
                setIsLoading(false);
                localStorage.removeItem("token");
                navigate("/login");
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <>
                <Box sx={{ display: "flex" }}>
                    <Navbar />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <SkeletonTable />
                    </Box>
                </Box>
            </>
        );
    }

    if (data) {
        const rowsWithIds = data.map(({ _id, title, description, status, agentId, clientId, price }) => ({
            title, description, status, agentId, clientId, price,
            id: _id,
        }));

        return (
            <>
                <Box sx={{ display: "flex" }}>
                    <Navbar />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        {error && (
                            <Alert variant="filled" severity="error">
                                {error}
                            </Alert>
                        )}
                        <h3>All Orders</h3>
                        <div style={{ height: 450, width: "100%" }}>
                            <DataGrid
                                rows={rowsWithIds}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 },
                                    },
                                }}
                                pageSizeOptions={[2, 5, 10]}
                                checkboxSelection={false}
                                autoHeight
                                autoHeightSizeMode="fullWidth"
                            />
                        </div>
                    </Box>
                </Box>
            </>
        );
    }
}
