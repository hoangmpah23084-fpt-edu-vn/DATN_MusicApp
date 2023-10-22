import { deleteArtist, handleGetArtist } from "@/store/Reducer/artistReducer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import Title from "../Title";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const ListArtist = () => {
  const { artist } = useAppSelector(({ artist }) => artist);
  const disaptch = useAppDispatch();
  useEffect(() => {
    void disaptch(handleGetArtist());
  }, [disaptch]);
  const handDeleteArtist = (_id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      void disaptch(deleteArtist(_id));
      alert("Xóa Artist thành công");
    }
  };
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", flex: 1, align: "center", headerAlign: "center" },
    { field: "name", headerName: "Name", headerAlign: "center", editable: false, align: "center", flex: 1 },
    { field: "age", headerName: "Age", headerAlign: "center", editable: false, align: "center", flex: 1 },
    { field: "images", headerName: "Images", headerAlign: "center", editable: false, align: "center", flex: 1 },
    { field: "description", headerName: "Description", headerAlign: "center", editable: false, align: "center", flex: 1 },
    { field: "album", headerName: "Album", headerAlign: "center", editable: false, align: "center", flex: 1 },
    { field: "songs", headerName: "Songs", headerAlign: "center", editable: false, align: "center",
    renderCell : (params) => {
      const data : string[] = params.row.songs.name;
      return data;
    }, flex: 1 },
    {
      field: "Action", headerName: "Action", type: "number", headerAlign: "center", editable: false, align: "center",
      renderCell: (params: GridRenderCellParams<{ _id: string }>) => {
        const _id: string = params.row._id;
        return (
          <Stack direction={"row"} spacing={1}>
            <Button variant="outlined" color="warning" size="small">
              <Link to={`/admin/update-artist/${_id}`}>Edit</Link>
            </Button>
            <Button variant="outlined" color="error" size="small" onClick={() => handDeleteArtist(_id)} >Delete</Button>
          </Stack>
        );
      },
      flex: 1,
    },
  ];

  return (
    <>
      <Title Title="List Artist" />
      <Box sx={{ width: "100%", height: "700px", display: "grid" }}>
        <DataGrid
          rows={artist}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } }}}
          getRowId={(row) => row._id}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};
export default ListArtist;