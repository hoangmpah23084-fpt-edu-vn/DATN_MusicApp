import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Pagination, Table, Button, Popconfirm, Form } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Skeleton } from 'antd';
import { chekcSubString } from "@/constane/song.const";
import { getUsers } from "@/store/Reducer/User";

const ListUser2 = () => {

  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const { song, totalSong, loading, loadingRemove, dataOne } = useSelector((state: RootState) => state.Song)
  const [form] = Form.useForm();


  // get dữ liệu
  const {user} = useAppSelector(({user}) => user);
    // console.log(user);
    
   useEffect(() => {
     void dispatch(getUsers())
   },[dispatch])


  // tìm kiếm
//   const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setSearch(e.target.value)
//   };

  //phân trang
  const onChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  };

  interface columns {
    key: string
  }


  const dataSource = user.map((item: any, index) => {
    // console.log('item', item);
    
    return {
      key: item._id,
      id: index + 1,
      ten: chekcSubString(item.fullName as string, 20),
      email: chekcSubString(item.email as string, 20),
      role: chekcSubString(item.role as string, 20),
      anh: <img src={item.image?.[0]} className="w-14 h-14 rounded-xl" alt="No image"  />,
    //   casi: item.id_Singer,
    //   luotnghe: item.view_song,
    //   yeuthich: item.total_like,

    }
  })
  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,

    },
    {
      title: 'Tên',
      dataIndex: 'ten',
      key: 'ten',
      width: 200,
    },
    {
      title: 'Ảnh',
      dataIndex: 'anh',
      key: 'anh',
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,

    },
    {
      title: 'Quyền hạn',
      dataIndex: 'role',
      key: 'role',
      width: 150,
    },
    // {
    //   title: 'Lượt yêu thích',
    //   dataIndex: 'yeuthich',
    //   key: 'yeuthich',
    //   width: 200,
    // },
    {
      title: 'Chức năng',
      dataIndex: 'chucnang',
      key: 'chucnang',
      render: (_: any, record: any  ) => (
        <div className="flex justify-center items-center">
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn chắc chắn muốn xóa chứ ?"
            onConfirm={() => confirm(record?.key as string)}
            okText="xóa"
            cancelText="Không"
            placement="topRight"
            okType='danger'
          >
            {record.role == "member" ? <Button className="ml-2" danger loading={loadingRemove}>Xóa</Button> : ""    }   
          </Popconfirm>
        </div>
      ),
      fixed: 'right',
      width: 170,
      align: 'center',
    },
  ]
  const skeletonItems = Array.from({ length: song.length === 0 || song.length > 10 ? 10 : song.length }, () => {
    return (
      <div className="mt-10 w-full">
        <Skeleton.Input active className="ml-2 max-h-4" size="large" style={{ borderRadius: '40px' }} />
        <Skeleton.Input active className="ml-2 max-h-4" size="small" style={{ borderRadius: '40px' }} />
        <Skeleton.Input active className="ml-2 max-h-4" size="large" style={{ borderRadius: '40px' }} />
        <Skeleton.Input active className="ml-2 max-h-4" size="small" style={{ borderRadius: '40px' }} />
        <Skeleton.Input active className="ml-2 max-h-4" size="large" style={{ borderRadius: '40px' }} />
        <Skeleton.Input active className="ml-2 max-h-4" size="small" style={{ borderRadius: '40px' }} />
        <Skeleton.Input active className="ml-2 max-h-4" size="small" style={{ borderRadius: '40px' }} />
        <Skeleton.Input active className="ml-2 max-h-4" size="small" style={{ borderRadius: '40px' }} />
      </div>
    )
  })

  type FieldType = {
    song_name: string;
    song_title: string;
    song_link: string[] | string | undefined;
    song_image: string[];
    id_Singer: string;
    id_Genre: string;
  };


  useEffect(() => {
    form.setFieldsValue(dataOne);
  }, [dataOne])


  return (
    <div className="relative">
      <header className="fixed top-0 flex items-center justify-between z-40 bg-[#F4F5F7] pt-2 w-[100%] pb-2.5 ">
        <span className="font-bold text-xl ml-10">Danh sách người dùng</span>
      </header>
      <main className="w">
        {loading 
        ? <div className="mt-32">{skeletonItems}</div> 
        : <Table dataSource={dataSource} columns={columns} pagination={false} className="mt-12" scroll={{ y: 650 }} />}
      </main>
      <footer className="w-[100%] h-10 bg-[#F4F5F7] fixed bottom-0 z-50">
        <Pagination defaultCurrent={page} total={totalSong || 1} onChange={onChangePage} className="absolute bottom-1 right-72   z-50" />
      </footer>
    </div>
  )
}
export default ListUser2