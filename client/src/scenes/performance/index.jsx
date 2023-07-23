import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import CustomColumnMenu from 'components/DataGridCustomColumnMenu';
import Header from 'components/Header';
import React from 'react'
import { useSelector } from 'react-redux';
import { useGetPerformanceQuery } from 'states/api'

const Performance = () => {
    const theme = useTheme();
    const userId = useSelector((state) => state.global.userId);
    const { data, isLoading } = useGetPerformanceQuery(userId);

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
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            rederCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            rederCell: (params) => `$${Number(params.value).toFixed(2)}`
        }
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="PERFORMANCE"  subtitle="List of Customers" />
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
                rows={ (data && data.sales) || []}
                columns={columns}
                components={{
                    ColumnMenu: CustomColumnMenu
                }}
            />
            </Box>
        </Box>
    )
}

export default Performance