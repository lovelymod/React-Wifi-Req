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
import { useEffect, useState } from "react";
import { Button, Stack, Chip } from "@mui/material";
import moment from "moment";
import "../style/table.css";
import AdminDialog from "../components/adminDialog";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const MuiTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const timeStamp = moment().format("YYYY_MM_DD");
  const [pageSize, setPageSize] = useState(25);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [memberList, setMemberList] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const getUser = await axios.get("http://localhost:5000/getusers");
    setMemberList(getUser.data);
    setLoading(false);
  };

  const deleteMember = (id) => {
    Swal.fire({
      title: "Confirm Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const newMemberList = memberList.filter((val) => val.id !== id);
        setMemberList(newMemberList);
        Swal.fire({
          icon: "success",
          title: "Deleted !",
          timer: 1200,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "ลำดับ",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "Dates",
      headerName: "วันที่",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "Times",
      headerName: "เวลา",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "Ip_Addr",
      headerName: "เลข IP เครื่อง",
      hide: true,
    },
    {
      field: "Firstname",
      headerName: "ชื่อ",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "Lastname",
      headerName: "นามสกุล",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "Email",
      headerName: "อีเมล",
      hide: true,
    },
    {
      field: "Tel",
      headerName: "เบอร์โทร",
      hide: true,
    },
    {
      field: "User_Type",
      headerName: "ประเภท",
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
      headerName: "ชนิดอุปกรณ์",
      hide: true,
    },
    {
      field: "Device_Brand",
      headerName: "แบรนด์",
      hide: true,
    },
    {
      field: "Device_Name",
      headerName: "ชื่ออุปกรณ์",
      hide: true,
    },
    {
      field: "Start_Date",
      headerName: "เข้าวันที่",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "End_Date",
      headerName: "ออกวันที่",
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
      flex: 0.5,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<FormatListBulletedRoundedIcon color="primary" />}
          label="Detail"
          onClick={() => {
            const rowData = params.row;
            navigate("/showdata", { state: { rowData } });
          }}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<EditRoundedIcon color="primary" />}
          label="Edit"
          onClick={() => {
            const rowData = params.row;
            navigate("/edituser", { state: { rowData, pathName } });
          }}
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
      <>
        <GridToolbarContainer sx={{ display: "flex", justifyContent: "flex-end", paddingX: "50px" }}>
          <Stack direction="row" spacing={3}>
            <GridToolbarQuickFilter />
            <Button variant="contained" onClick={() => setOpen(true)}>
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
      </>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
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
      ></DataGrid>
      <AdminDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default MuiTable;
