import React from 'react';
import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGetAdminsQuery } from 'states/api';
import CustomColumnMenu from 'components/DataGridCustomColumnMenu';
import Header from 'components/Header';

const Admins = () => {
    const theme = useTheme();
    const { data, isLoading } = useGetAdminsQuery();
    
    const columns = [
        {
        field: "_id",
        headerName: "ID",
        flex: 1
        },
        {
        field: "name",
        headerName: "Name",
        flex: 0.5
        },
        {
        field: "email",
        headerName: "email",
        flex: 1
        },
        {
        field: "phoneNumber",
        headerName: "Phone Number",
        flex: 0.5,
        renderCell: (params) => {
            return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
        }
        },
        {
        field: "country",
        headerName: "Country",
        flex: 0.4
        },
        {
        field: "occupation",
        headerName: "Occupation",
        flex: 1
        },
        {
        field: "role",
        headerName: "Role",
        flex: 0.5
        }
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="ADMINS"  subtitle="List of Admins" />
            <Box
                m="40px 0"
                height="75vh"
                sx={{
                "& .MuiDataGrid-root": {
                    border: "none"
                },
                "& .MuiDataGrid-cell": {
                    border: "none"
                },
                "& .MuiDataGrid-columnHeader": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: "none"
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme.palette.primary.light,

                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: "none"
                }
                }}>
                <DataGrid
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={ data || []}
                columns={columns}
                components={{
                    ColumnMenu: CustomColumnMenu
                }}
                />
            </Box>
        </Box>
    )
}

export default Admins