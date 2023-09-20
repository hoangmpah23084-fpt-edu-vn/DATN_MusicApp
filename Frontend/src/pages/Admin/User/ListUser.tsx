import { Box, IconButton, Stack } from '@mui/material'
import {useEffect} from 'react'
import Title from '../Title'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUsers } from '@/store/Reducer/User';
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex : 1 },
    {
      field: 'firstName',
      headerName: 'First name',
      flex : 1,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      flex : 1,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      headerAlign: 'left',
      align : "left",
      flex : 1,
      type: 'number',
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      flex : 1,
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'Action',
        headerName: 'Action',
        flex : 1,
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        // disableClickEventBubbling: true,
        
        renderCell: (params : GridRenderCellParams<{_id : string}>) => {
          const id: string = params.row._id;
            return (
              <Stack direction="row" spacing={1}>
                <IconButton>
                    <VisibilityIcon></VisibilityIcon>
                </IconButton>
              </Stack>
            );
        },
      }
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];


const ListUser = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(({user}) => user);
    console.log(user);
    
   useEffect(() => {
     void dispatch(getUsers())
   },[dispatch])

  return (
    <>
    <Title Title='List User' />
    <Box sx={{ width : "100%", display : "grid" }} >
    <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </>
  )
}
export default ListUser