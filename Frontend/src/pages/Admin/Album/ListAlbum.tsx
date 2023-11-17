import { deleteAlbum, getAlbum } from "@/store/Reducer/albumReducer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import Title from "../Title";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ListAlbum = () => {
  const { album } = useAppSelector(({ album }) => album);
  const disaptch = useAppDispatch();
  useEffect(() => {
    void disaptch(getAlbum());
  }, [disaptch]);
  const handDeleteAlbum = (_id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      void disaptch(deleteAlbum(_id));
      alert("Xóa Album thành công");
    }
  };
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", headerAlign: "center", editable: false, align: "center", flex: 1 },
    { field: "album_name", headerName: "Name", headerAlign: "center", editable: false, align: "center", flex: 1 },
    { field: "id_artist", headerName: "Artist Name", headerAlign: "center", editable: false, align: "center",
      renderCell: (params) => {
        let data: string = "";        
        if(params.row.id_artist) {
          data = params.row.id_artist.name;
        }
        return data;
      },
      flex: 1,
    },
    { field: "list_song", headerName: "List Song", headerAlign: "center", editable: false, align: "center",
      renderCell: (params) => {
        const data: number = params.row.list_song.length;
        return data;
      },
      flex: 1,
    },
    {
      field: "Action", headerName: "Action", type: "number", headerAlign: "center", editable: false, align: "center",
      renderCell: (params: GridRenderCellParams<{ _id: string }>) => {
        const _id: string = params.row._id;
        return (
          <Stack direction={"row"} spacing={1}>
            <Button variant="outlined" color="warning" size="small">
              <Link to={`/admin/update-album/${_id}`}>
                <EditOutlinedIcon />
              </Link>
            </Button>
            <Button variant="outlined" color="error" size="small" onClick={() => handDeleteAlbum(_id)}>
              <DeleteOutlineOutlinedIcon />
            </Button>
          </Stack>
        );
      },
      flex: 1,
    },
  ];

  return (
    <>
      <Title Title="List Album" />
      <Button variant="contained" color="success" size="small">
        <Link to={'/admin/add-album'}>Add Album</Link>
      </Button>
      <Box sx={{ width: "100%", display: "grid", marginTop: "20px" }}>
        <DataGrid
          rows={album}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } }}}
          getRowId={(row) => row._id}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};
export default ListAlbum;