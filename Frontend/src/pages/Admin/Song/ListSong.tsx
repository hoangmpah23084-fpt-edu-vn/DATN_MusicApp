import { handAddSong, handDeleteSong, handGetOne, handGetSong } from "@/store/Reducer/Song";
import { useAppDispatch } from "@/store/hooks";
import { Pagination, Table, Button, message, Popconfirm, Modal, Form, Upload, Select, UploadFile } from "antd";
import { Input } from 'antd';
import { useEffect, useRef, useState } from "react";
import { IApiSong, SongLink, ifSong } from "../Interface/ValidateSong";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Skeleton } from 'antd';
import { chekcSubString } from "@/constane/song.const";
import { AiFillEye, AiOutlinePlus } from 'react-icons/ai'
import { handImage, handleFileUpload } from "@/Mui/Component/handUpload";
import { handleGetSinger } from "@/store/Reducer/singerReducer";
import { getGenre } from "@/store/Reducer/genreReducer";
import { ISinger } from "../Interface/ISinger";
import { IGenre } from "../Interface/genre";
const { Option } = Select;
const ListSong = () => {

  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [search, setSearch] = useState<string>("")
  const [openDetail, setOpenDetail] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const { song, totalSong, loading, loadingRemove, loadingGetone, dataOne, loadingAdd } = useSelector((state: RootState) => state.Song)
  const { genre } = useSelector((state: RootState) => state.genre)
  const { singer } = useSelector((state: RootState) => state.singer)
  const [imageForm, setImageForm] = useState<SongLink[]>([]);
  const [songForm, setSongForm] = useState<SongLink>({ name: '', value: '' });
  const [form] = Form.useForm();
  const formRef = useRef<any>();
  const [checkUpdate, setCheckUpdate] = useState(false)


  // get dữ liệu
  useEffect(() => {
    const data: IApiSong = {
      page: page,
      pageSize: pageSize,
      search: search
    }
    dispatch(handGetSong(data))

  }, [page, pageSize, search])


  // tìm kiếm
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value)
  };

  //phân trang
  const onChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  };


  //xóa
  const confirm = async (id: string) => {
    await dispatch(handDeleteSong(id))
    message.success('Xóa bài hát thành công');
  };



  //cancel form
  const handleCancel = () => {
    setOpenDetail(false);
    setOpenAdd(false)
    setCheckUpdate(false)
    formRef.current.resetFields()
  };

  const handleGetDetail = (id: string) => {
    setOpenDetail(true);
    dispatch(handGetOne(id))
  }

  interface columns {
    key: string
  }


  const dataSource = song.map((item: ifSong) => {
    return {
      key: item._id,
      id: chekcSubString(item._id as string, 5),
      ten: chekcSubString(item.song_name as string, 20),
      anh: <img src={item.song_image[0]} className="w-14 h-14 rounded-xl" />,
      casi: item.id_Singer,
      luotnghe: item.view_song,
      yeuthich: item.total_like,

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
      title: 'Ca sĩ',
      dataIndex: 'casi',
      key: 'casi',
      width: 150,

    },
    {
      title: 'Lượt nghe',
      dataIndex: 'luotnghe',
      key: 'luotnghe',
      width: 150,
    },
    {
      title: 'Lượt yêu thích',
      dataIndex: 'yeuthich',
      key: 'yeuthich',
      width: 200,
    },
    {
      title: 'Chức năng',
      dataIndex: 'chucnang',
      key: 'chucnang',
      render: (_: any, record: columns) => (
        <div className="flex justify-center items-center">
          <Button onClick={() => handleGetDetail(record?.key as string)}><AiFillEye className='text-xl text-[#4a89ff] cursor-pointer' /></Button>
          <Button className="ml-2 text-[#699af4db]" onClick={() => handleEdit(record?.key as string)}>Sửa</Button>
          <Popconfirm
            title="Xóa bài hát"
            description="Bạn chắc chắn muốn xóa chứ ?"
            onConfirm={() => confirm(record?.key as string)}
            okText="xóa"
            cancelText="Không"
            placement="topRight"
            okType='danger'
          >
            <Button className="ml-2" danger loading={loadingRemove}>Xóa</Button>
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

  // upload
  const uploadImg = async ({ file, onSuccess, onError }: any) => {
    try {
      const imageUrl = await handImage([file]);
      message.success(`${file.name} file uploaded successfully`);
      onSuccess();
      const newData = {
        name: file.name,
        value: imageUrl
      }
      if (imageUrl) {
        setImageForm((value: any) => [...value, newData])
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      onError(error);
    }
  };

  const uploadSong = async ({ file, onSuccess, onError }: any) => {
    try {
      const songURL = await handleFileUpload([file]);
      const newData = {
        name: file.name,
        value: songURL
      }
      message.success(`${file.name} file uploaded successfully`);
      setSongForm(newData as any)
      onSuccess();
    } catch (error) {
      console.error('Error uploading file:', error);
      onError(error);
    }
  };


  //xóa
  const onRemoveImg = (file: UploadFile<any>) => {
    const filterItem = imageForm.filter((item: any) => item.name.trim() !== file.name.trim());
    if (filterItem) {
      setImageForm(filterItem);
    }
  };

  const onRemoveSong = () => {
    setSongForm({
      name: "",
      value: ""
    })
  }
  // const formatImgUpdate = () => {
  //   return dataOne?.song_image.map((item: string) => (
  //     {
  //       uid: item,
  //       name: item,
  //       status: item,
  //       url: item,
  //       thumbUrl: item,
  //     }
  //   ))
  // }


  // hàm show form
  const showAdd = () => {
    setOpenAdd(true)
    dispatch(handleGetSinger())
    dispatch(getGenre())
  }


  type FieldType = {
    song_name: string;
    song_title: string;
    song_link: string[] | string | undefined;
    song_image: string[];
    id_Singer: string;
    id_Genre: string;
  };

  //call api khi sửa để đổ dữ liệu vào form
  //hàm sửa
  const handleEdit = async (id: string) => {
    setOpenAdd(true)
    setCheckUpdate(true)
    await dispatch(handGetOne(id))
    dispatch(handleGetSinger())
    dispatch(getGenre())
    setOpenDetail(false)
  }
  useEffect(() => {
    form.setFieldsValue(dataOne);
  }, [dataOne])

  // form dùng chung add và update
  const formItem = () => {
    return <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      requiredMark="optional"
      className="w-full flex-1 relative"
      ref={formRef as any}
    >
      <Form.Item<FieldType>
        label="Tên bài hát"
        name="song_name"
        rules={[{ required: true, message: 'Vui lòng nhập tên bài hát' }]}
      >
        <Input placeholder="A-z-0-9" allowClear className="" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Tiêu đề bài hát"
        name="song_title"
        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài hát' }]}
      >
        <Input placeholder="A-z-0-9" allowClear className="" />
      </Form.Item>

      <div className="flex justify-center items-center w-full">
        <Form.Item<FieldType> name='id_Singer'
          label="Ca sĩ"
          rules={[{ required: true, message: 'Vui lòng chọn ca sĩ' }]}
          className="w-full min-w-0"
        >
          <Select
            defaultValue="Chọn ca sĩ"
            style={{ width: '48%' }}
          >
            {singer.map((item: ISinger) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item<FieldType> name='id_Genre'
          label="Thể loại"
          rules={[{ required: true, message: 'Vui lòng chọn thể loại' }]}
          className="w-full min-w-0"
        >
          <Select
            defaultValue="Chọn thể loại"
            style={{ width: '50%' }}
          >
            {genre.map((item: IGenre) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="flex justify-center items-center w-full">
        <Upload
          multiple
          customRequest={uploadImg}
          onRemove={onRemoveImg}
          className="w-full min-w-0"
        >
          <Button className="w-full">Tải lên ảnh</Button>
        </Upload>
        <Upload customRequest={uploadSong} className="w-full min-w-0" onRemove={onRemoveSong}>
          <Button className="w-full">Tải lên Nhac</Button>
        </Upload>
      </div>
      <div className='flex justify-end mt-10'>
        <Button onClick={cancel} danger>
          Hủy
        </Button>
        <Button htmlType="submit" className="text-[#4a89ff] border-[#4a89ff] ml-4" loading={loadingAdd}>
          {checkUpdate ? "Cập nhật" : "Thêm"}
        </Button>
      </div>
    </Form>
  }


  // hủy form
  const cancel = () => {
    setOpenAdd(false)
    setCheckUpdate(false)
    formRef.current.resetFields()
  }


  // hàm sử lý call api khi add
  const formAdd = (newData: ifSong) => {
    dispatch(handAddSong(newData as ifSong)).unwrap().then(() => {
      message.success(`Thêm bài hát thành công`);
      formRef.current.resetFields();
      setImageForm([])
      setSongForm({
        name: "",
        value: ""
      })
      setOpenAdd(false)
      const dataGet: IApiSong = {
        page: page,
        pageSize: pageSize,
        search: search
      }
      dispatch(handGetSong(dataGet))
    }).catch((error) => {
      console.error('Thêm bài hát thất bại:', error);
    });

  }

  const handleSubmit = (data: ifSong) => {
    const newData = {
      ...data,
      song_link: songForm.value,
      song_image: imageForm.map((item: any) => (item.value[0]))
    }
    if (checkUpdate) {
      //xử lúy khi update
      console.log(123);
    } else {
      // hàm sử lý call api khi add
      formAdd(newData)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  const modalAdd = () => {
    return <Modal
      title={checkUpdate ? "Cập nhật bài hát" : "Thêm bài hát"}
      open={openAdd}
      onCancel={handleCancel}
      footer={null}
    >
      {formItem()}
    </Modal>
  }



  const modalDetail = () => {
    return <Modal
      title="Chi tiết bài hát"
      open={openDetail}
      onOk={() => handleEdit(dataOne?._id as string)}
      onCancel={handleCancel}
      okText='Chỉnh sửa'
      cancelText='Thoát'
      okType='danger'
      width={600}
    >
      {loadingGetone ? <Skeleton active /> : <div className="flex items-center justify-between pt-5 pb-5">
        <div>
          <p><strong>ID:</strong> {dataOne?._id}</p>
          <p><strong>Tên bài hát:</strong> {dataOne?.song_name}</p>
          <p><strong>Ca sĩ:</strong> {dataOne?.id_Singer}</p>
          <p><strong>Link:</strong> <a href={dataOne?.song_link}>{chekcSubString(dataOne?.song_link as string, 50)}</a></p>
          <p><strong>Mô tả: </strong>{chekcSubString(dataOne?.song_lyric as string, 20)}</p>
          <p><strong>Lượt nghe:</strong> {dataOne?.view_song}</p>
          <p><strong>Lượt yêu thích: </strong>{dataOne?.total_like}</p>
        </div>
        {dataOne?.song_image.map(item => (<img src={item} className="w-32 h-32 rounded-xl" />))}
      </div>}
    </Modal>
  }



  return (
    <div className="relative">
      {modalDetail()}
      {modalAdd()}
      <header className="fixed top-0 flex items-center justify-between z-40 bg-[#F4F5F7] pt-2 w-[100%] pb-2.5 ">
        <span className="font-bold text-xl ml-10">Danh sách nhạc</span>
        <Input placeholder="Tìm kiếm bài hát" allowClear onChange={onChange} className="w-96 mr-40" />
        <Button onClick={() => showAdd()} className="flex items-center right-64 text-[#fff]  border-[#fff] bg-[#4a89ff] hover:bg-[#fff] hover:text-[#4a89ff]"><AiOutlinePlus className='text-lg mr-1 ' />Thêm bài hát</Button>
      </header>
      <main className="w">
        {loading ? <div className="mt-32">{skeletonItems}</div> : <Table dataSource={dataSource} columns={columns} pagination={false} className="mt-12" scroll={{ y: 650 }} />}
      </main>
      <footer className="w-[100%] h-10 bg-[#F4F5F7] fixed bottom-0 z-50">
        <Pagination defaultCurrent={page} total={totalSong || 1} onChange={onChangePage} className="absolute bottom-1 right-72   z-50" />
      </footer>
    </div>
  )
}
export default ListSong