import { deleteGenre, getGenre } from '@/store/Reducer/genreReducer';
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import  { useEffect } from 'react'
import Title from '../Title';
import { Box, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const ListGenre = () => {
  const {genre} = useAppSelector(({genre}) => genre);
  const disaptch = useAppDispatch();
  useEffect(() => {
    void disaptch(getGenre());
  },[disaptch])
  const handDeleteGenre = (_id :string) => {
    if (confirm("Bạn có chắc chắn muốn xóa chứ !")) {
       void disaptch(deleteGenre(_id))
       alert("Xóa Genre Thành công")
    }
  }
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', flex : 1,  align : "center", headerAlign : "center" },
    {
      field: 'name',
      headerName: 'First name',
      headerAlign : "center",
      editable: true,
      align : "center",
      flex : 1
    },
    {
      field: 'list_songs',
      headerName: 'List Songs',
      headerAlign : "center",
      editable: true,
      align : "center",
      renderCell : (params) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const data : string[] = params.row.list_songs.length;
        return data;
      },
      flex : 1
    },
    {
      field: 'Action',
      headerName: 'Action',
      type: 'number',
      headerAlign : "center",
      editable: true,
      align : "center",
      flex : 1,
      renderCell : (params : GridRenderCellParams<{_id : string}> ) => {
        const _id : string = params.row._id;

        return <>
        <Stack direction={"row"} spacing={1} >
        <Button variant="outlined" color="warning" size="small" ><Link to={`/admin/UpdateGenre/${_id}`}  >Edit</Link></Button>
        <Button variant="outlined" color="error" size="small" onClick={() => handDeleteGenre(_id)}  >Delete</Button>
        </Stack>
        </>
      }
    }
  ];
  

  return (
    <>
    <Title Title='List Genre' />
    <Box sx={{ width : "100%" , height : "700px",  display : "grid" }} >
        <DataGrid
        rows={genre}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
        getRowId={(row ) => row._id}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </>
  )
}
export default ListGenre
