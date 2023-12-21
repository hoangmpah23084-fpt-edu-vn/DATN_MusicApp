import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Pagination, Table, Button, Popconfirm, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Skeleton } from 'antd';
import { chekcSubString } from "@/constane/song.const";
import { GetUser, getUsers } from "@/store/Reducer/User";
import { AiFillEye } from "react-icons/ai";


const ListUser = () => {

  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(1)
  const [openDetail, setOpenDetail] = useState(false);
  const [detaillUser, setDetailUser] = useState({});
  const [pageSize, setPageSize] = useState<number>(10)
  const { song, totalSong, loading, loadingRemove, dataOne } = useSelector((state: RootState) => state.Song)
  const [form] = Form.useForm();


  // get dữ liệu
  const {user} = useAppSelector(({user}) => user);
    // console.log(user);
    
   useEffect(() => {
     void dispatch(getUsers())
   },[dispatch])

   const handleGetDetail = (id: string) => {
    setOpenDetail(true);
    // console.log(id);
    // dispatch(GetUser(id));
    fetch(`http://localhost:8080/api/members/${id}`)
    .then((response) => response.json())
    .then((data) => setDetailUser(data.user))
    // console.log(detaillUser);
    
  };
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
      anh: <img src={item.image} className="w-[150px] h-[150px] rounded-xl" alt="No image"  />,
    //   casi: item.id_Singer,
    //   luotnghe: item.view_song,
    //   yeuthich: item.total_like,

    }
  })
  const columns: any = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 50,

    },
    {
      title: 'Tên',
      dataIndex: 'ten',
      key: 'ten',
      width: 120,
    },
    {
      title: 'Ảnh',
      dataIndex: 'anh',
      key: 'anh',
      width: 200,
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
    {
      title: 'Chức năng',
      dataIndex: 'chucnang',
      key: 'chucnang',
      render: (_: any, record: any  ) => (
        <div className="flex justify-center items-center">
          <Button onClick={() => handleGetDetail(record?.key as string)}>
            <AiFillEye className="text-xl text-[#4a89ff] cursor-pointer" />
          </Button>
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn chắc chắn muốn xóa chứ ?"
            onConfirm={() => confirm(record?.key as string)}
            okText="xóa"
            cancelText="Không"
            placement="topRight"
            okType='danger'
          >
            {/* {record.role == "member" ? <Button className="ml-2" danger loading={loadingRemove}>Xóa</Button> : ""    }    */}
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

  useEffect(() => {
    form.setFieldsValue(dataOne);
  }, [dataOne])

  //cancel form
  const handleCancel = () => {
    setOpenDetail(false);
    // formRef.current.resetFields();
  };

  const modalDetail = () => {
    return (
      <Modal
        title="Chi tiết người dùng"
        open={openDetail}
        onCancel={handleCancel}
        onOk={handleCancel}
        cancelText="Thoát"
        okType="danger"
        width={600}
      >
        { (
          <div className="flex items-center justify-between pt-5 pb-5">
            <div>
              <p>
                <strong>ID:</strong> {detaillUser?._id}
              </p>
              <p>
                <strong>Full Name:</strong> {detaillUser?.fullName}
              </p>
              <p>
                <strong>Email:</strong> {detaillUser?.email}
              </p>
              <p>
                <strong>Quyền: </strong>
                {detaillUser?.role}
              </p>
            
            </div>
              <img src={detaillUser?.image} className="w-32 h-32 rounded-xl" alt="No image" />
          </div>
        )}
      </Modal>
    );
  };

  return (
    <div className="relative">
      {modalDetail()}
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
export default ListUser