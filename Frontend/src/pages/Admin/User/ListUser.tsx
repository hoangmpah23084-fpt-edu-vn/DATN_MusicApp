import { Box, IconButton, Stack } from '@mui/material'
import {useEffect} from 'react'
import Title from '../Title'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUsers } from '@/store/Reducer/User';
import {Image} from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  image: string;
  tags: string[];
}

// const columns: ColumnsType<DataType> = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Image',
//     dataIndex: 'image',
//     key: 'image',
//     render: (_, record) => (
//       <img width={200} src={record.image} />
//     )
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Tags',
//     key: 'tags',
//     dataIndex: 'tags',
//     render: (_, { tags }) => (
//       <>
//         {tags.map((tag) => {
//           let color = tag.length > 5 ? 'geekblue' : 'green';
//           if (tag === 'loser') {
//             color = 'volcano';
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    image: 'https://picsum.photos/100/100',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    image: 'https://picsum.photos/200/300',

    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    image: 'https://picsum.photos/200/300',
    tags: ['cool', 'teacher'],
  },
];

const columns: any = [
    { field: 'id', headerName: 'ID', flex : 1 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex : 1,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex : 1,
      editable: true,
    },
    {
      field: 'image',
      headerName: 'Image',
      flex : 1,
      
    },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   headerAlign: 'left',
    //   align : "left",
    //   flex : 1,
    //   type: 'number',
    //   editable: true,
    // },

    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   flex : 1,
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    // //   valueGetter: (params: GridValueGetterParams) =>
    // //     `${params.row.fullName || ''} ${params.row.email || ''}`,
    // },
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
  

const ListUser = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(({user}) => user);
    // console.log(user);
    
   useEffect(() => {
     void dispatch(getUsers())
   },[dispatch])

  return (
    <>
    <Title Title='List User' />
    <Box sx={{ width : "100%", display : "grid" }} >
    <DataGrid
        rows={user}
        getRowId={(user) => user._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
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