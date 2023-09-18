import { useEffect } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { handDeleteSong, handGetSong } from '@/store/Reducer/Song';
import Title from '../Title';
import { Link } from 'react-router-dom';

const ListSong = () => {
  const dispatch = useAppDispatch();
  const {song} = useAppSelector(({Song}) => Song);

  
// console.log(song);

  useEffect(() => {
    void dispatch(handGetSong())
  }, [dispatch])
    const handleDelete = (id: string) => {
    // Thực hiện các thao tác xóa tại đây, ví dụ: dispatch(handDeleteSong(id))
    if (confirm("Bạn có chắc chắn muốn xóa không ? ")) {
     void  dispatch(handDeleteSong(id));
    }
  };

  const columns: GridColDef[] = [
    // { field: '_id', headerName: '_id', flex : 0.5, headerAlign: 'center',align: 'center' },
    { field: 'song_name', headerName: 'Name ', flex : 1, headerAlign: 'center',align: 'center' },
    { field: 'song_singer', headerName: 'Singer', flex : 1, headerAlign: 'center',align: 'center' },
    { field: 'song_title', headerName: 'Title', flex : 1, headerAlign: 'center',align: 'center' },
    { field: 'song_lyric', headerName: 'Lyric', flex : 1, headerAlign: 'center',align: 'center' },
    { field: 'song_link', headerName: 'Link', flex : 1, headerAlign: 'center',align: 'center' },
    { field: 'song_image', headerName: 'Image', flex : 1, headerAlign: 'center',align: 'center', renderCell : (params) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const image: string[] = params.row.song_image.length
      return image;
    } },
    { field: 'is_dowload', headerName: 'Dowload', flex : 1, headerAlign: 'center',align: 'center' },
    { field: 'id_Artists', headerName: 'id_Artists', flex : 1, headerAlign: 'center',align: 'center' },
    { field: 'id_Genre', headerName: 'id_Genre', flex : 1, headerAlign: 'center',align: 'center' },
    {
      field: 'action',
      headerName: 'Action',
      flex : 1,
      sortable: false,
      // disableClickEventBubbling: true,
      
      renderCell: (params : GridRenderCellParams<{_id : string}>) => {
        const id: string = params.row._id;
          return (
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" color="warning" size="small" ><Link to={`/admin/updatesong/${id}`} >Edit</Link></Button>
              <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(id)}  >Delete</Button>
            </Stack>
          );
      },
    }


  ];
  return (
    <>
    <Box sx={{  height: "700px" , width : "100%" , display : "grid",
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor : "#D0BFFF",
      color: "white",
    },
    "& .MuiDataGrid-footerContainer" : {
      backgroundColor : "#D0BFFF",
      color: "white",
    },
    "& .MuiTablePagination-displayedRows":{
      color : "white"
    },
    "& .MuiTablePagination-actions" : {
      color : " white"
    },
    "& .MuiTablePagination-selectLabel ":{
      color : "white"
    },
    "& .css-16c50h-MuiInputBase-root-MuiTablePagination-select ":{
      color : "white"
    },
    "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon":{
      color : "white"
    }
    }} >
     <Title Title='Show Product' />
     <DataGrid
        sx={{ height : "600px" }}
        rows={song}
        columns={columns}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick={true}
      />
    </Box>
    </>
  )
}
export default ListSong