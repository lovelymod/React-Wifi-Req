import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useState } from "react";
import { Button, Stack, Typography, Chip } from "@mui/material";
import moment from "moment";
import "../style/table.css";

const MuiTable = ({ loading, memberList, deleteMember, showUser, edituser, gotoAdminSub }) => {
  const timeStamp = moment().format("YYYY_MM_DD");
  const [pageSize, setPageSize] = useState(25);

  const columns = [
    {
      field: "id",
      headerName: "No.",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "Dates",
      headerName: "Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "Times",
      headerName: "Time",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "Ip_Addr",
      hide: true,
    },
    {
      field: "Firstname",
      headerName: "Firstname",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "Lastname",
      headerName: "Lastname",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "Email",
      hide: true,
    },
    {
      field: "Tel",
      hide: true,
    },
    {
      field: "User_Type",
      headerName: "UserType",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        if (params.value === "staff") {
          return (
            <Chip
              label={params.value.toUpperCase()}
              sx={{ backgroundColor: "#f6ffed", border: "1px solid #caf1ac", color: "#7dc15f" }}
            />
          );
        } else if (params.value === "internship") {
          return (
            <Chip
              label={params.value.toUpperCase()}
              sx={{ backgroundColor: "#fff2e8", border: "1px solid #ffc9aa", color: "#da512b" }}
            />
          );
        } else {
          return (
            <Chip
              label={params.value.toUpperCase()}
              sx={{ backgroundColor: "#e6f4ff", border: "1px solid #b8ddff", color: "#4d88e5" }}
            />
          );
        }
      },
    },
    {
      field: "Device_Type",
      hide: true,
    },
    {
      field: "Device_Brand",
      hide: true,
    },
    {
      field: "Device_Name",
      hide: true,
    },
    {
      field: "Start_Date",
      headerName: "Start Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "End_Date",
      headerName: "End Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      type: "actions",
      headerAlign: "center",
      align: "center",
      sortable: false,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<FormatListBulletedRoundedIcon color="primary" />}
          label="Detail"
          onClick={() => showUser(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<EditRoundedIcon color="primary" />}
          label="Edit"
          onClick={() => edituser(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteRoundedIcon color="error" />}
          label="Delete"
          onClick={() => deleteMember(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  const gridToolBar = () => {
    return (
      <GridToolbarContainer sx={{ display: "flex", justifyContent: "flex-end", paddingX: "50px" }}>
        <Stack direction="row" spacing={3}>
          <GridToolbarQuickFilter />
          <Button variant="contained" onClick={gotoAdminSub}>
            Add User
          </Button>
          <GridToolbarExport
            csvOptions={{
              fileName: `RequestList_${timeStamp}`,
              utf8WithBom: true,
              allColumns: true,
            }}
          />
        </Stack>
      </GridToolbarContainer>
    );
  };

  return (
    <DataGrid
      initialState={{
        sorting: {
          sortModel: [{ field: "id", sort: "desc" }],
        },
      }}
      rows={memberList}
      columns={columns}
      sx={{
        border: "none",
        fontSize: "16px",
        "& .MuiTablePagination-selectLabel": {
          marginBottom: "0px",
        },
        "& .MuiTablePagination-displayedRows": {
          marginBottom: "0px",
        },
      }}
      density="comfortable"
      loading={loading}
      components={{ Toolbar: gridToolBar }}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      disableSelectionOnClick
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
    />
  );
};

export default MuiTable;
