import { handDeleteSong, handGetOne, handGetSong } from "@/store/Reducer/Song";
import { useAppDispatch } from "@/store/hooks";
import { Pagination, Table, Button, message, Popconfirm, Modal, Form, Upload, Select } from "antd";
import { Input } from 'antd';
import { useEffect, useState } from "react";
import { IApiSong, ifSong } from "../Interface/ValidateSong";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Skeleton } from 'antd';
import { chekcSubString } from "@/constane/song.const";
import { AiFillEye, AiOutlinePlus } from 'react-icons/ai'
import { handImage, handleFileUpload } from "@/Mui/Component/handUpload";

const ListSong = () => {

  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [search, setSearch] = useState<string>("")
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const { song, totalSong, loading, loadingRemove, loadingGetone, dataOne } = useSelector((state: RootState) => state.Song)

  useEffect(() => {
    const data: IApiSong = {
      page: page,
      pageSize: pageSize,
      search: search
    }
    dispatch(handGetSong(data))

  }, [page, pageSize, search])
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value)
  };

  const onChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  };

  const dataSource = song.map((item: ifSong) => {
    return {
      key: item._id,
      id: chekcSubString(item._id as string, 5),
      ten: chekcSubString(item.song_name as string, 20),
      anh: <img src={item.song_image[0]} className="w-14 h-14 rounded-xl" />,
      casi: item.song_singer,
      luotnghe: item.view_song,
      yeuthich: item.total_like,

    }
  })

  const confirm = async (id: string) => {
    await dispatch(handDeleteSong(id))
    message.success('Xóa bài hát thành công');
  };
  const handleEdit = (id: string) => {
    console.log(id);
  }

  const handleCancel = () => {
    setOpen(false);
    setOpenAdd(false)
  };

  const handleGetDetail = (id: string) => {
    setOpen(true);
    dispatch(handGetOne(id))
  }

  interface columns {
    key: string
  }

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
      </div>
    )
  })

  const handleOk = () => {
    console.log("");
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };


  const modalDetail = () => {
    return <Modal
      title="Chi tiết bài hát"
      open={open}
      onOk={handleOk}
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
          <p><strong>Ca sĩ:</strong> {dataOne?.song_singer}</p>
          <p><strong>Link:</strong> <a href={dataOne?.song_link as string}>{chekcSubString(dataOne?.song_link as string, 50)}</a></p>
          <p><strong>Mô tả: </strong>{chekcSubString(dataOne?.song_lyric as string, 20)}</p>
          <p><strong>Lượt nghe:</strong> {dataOne?.view_song}</p>
          <p><strong>Lượt yêu thích: </strong>{dataOne?.total_like}</p>
        </div>
        {dataOne?.song_image.map(item => (<img src={item} className="w-32 h-32 rounded-xl" />))}
      </div>}
    </Modal>
  }
  const [imageForm, setImageForm] = useState<string[]>([]);
  const uploadImg = async ({ file, onSuccess, onError }: any) => {
    try {
      const imageUrl = await handImage([file]);
      if (imageUrl && imageUrl.length > 0) {
        message.success(`${file.name} file uploaded successfully`);
        onSuccess();
        setImageForm([...imageForm, imageUrl[0]]);
      } else {
        message.error('Failed to get image URL');
        onError('Failed to get image URL');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      onError(error);
    }
  };

  const uploadSong = async ({ file, onSuccess, onError }: any) => {
    try {
      const songURL = await handleFileUpload([file]);
      console.log("songURL", songURL);
      message.success(`${file.name} file uploaded successfully`);
      onSuccess();
    } catch (error) {
      console.error('Error uploading file:', error);
      onError(error);
    }
  };

  const handleRemoveImage = (index: any) => {
    console.log(index);

    const newImageForm = [...imageForm];
    newImageForm.splice(index, 1);
    setImageForm(newImageForm);
  };

  type FieldType = {
    song_name: string;
    song_title: string;
    song_link: string[] | string | undefined;
    song_image: string[];
    song_singer: string;
    song_musian: string;
    song_lyric?: string;
    id_Genre: string;
    id_Artists: string;
  };

  const formItem = () => {
    return <Form
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
    >
      <Form.Item<FieldType>
        label="Tên bài hát"
        name="song_name"
        rules={[{ required: true, message: 'Vui lòng nhập tên bài hát' }]}
      >
        <Input placeholder="A-z-0-9" allowClear className="w-96 mr-40" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Tiêu đề bài hát"
        name="song_title"
        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài hát' }]}
      >
        <Input placeholder="A-z-0-9" allowClear className="w-96 mr-40" />
      </Form.Item>
      <Form.Item>
        <Upload
          multiple
          customRequest={uploadImg}
          fileList={imageForm.map((url, index) => ({
            uid: String(index),
            name: `Ảnh-${index + 1}`,
            status: 'done',
            url,
          }))}
          onRemove={(file) => {
            const index = imageForm.indexOf(file.url as any);
            if (index !== -1) {
              handleRemoveImage(index);
            }
          }}
        >
          <Button>Tải lên ảnh</Button>
        </Upload>
      </Form.Item>
      <Form.Item >
        <Upload customRequest={uploadSong} showUploadList={true}>
          <Button>Tải lên Nhac</Button>
        </Upload>
      </Form.Item>
      <Form.Item name='id_singer'>
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </Form.Item>

      <Form.Item name='id_Genre'>
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </Form.Item>
      <Form.Item<FieldType>>
        <Button htmlType="submit">
          Hủy
        </Button>
        <Button htmlType="submit">
          Thêm
        </Button>
      </Form.Item>
    </Form>
  }

  const handleSubmit = (data: any) => {
    console.log("imageForm", imageForm);
    console.log(data);
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  const modalAdd = () => {
    return <Modal
      title="Thêm bài hát"
      open={openAdd}
      onCancel={handleCancel}
      footer={null}
    >
      {formItem()}
    </Modal>
  }

  const showAdd = () => {
    setOpenAdd(true)
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
        {loading ? skeletonItems : <Table dataSource={dataSource} columns={columns} pagination={false} className="mt-12" scroll={{ y: 650 }} />}
      </main>
      <footer className="w-[100%] h-10 bg-[#F4F5F7] fixed bottom-0 z-50">
        <Pagination defaultCurrent={page} total={totalSong || 1} onChange={onChangePage} className="absolute bottom-1 right-72   z-50" />
      </footer>
    </div>
  )
}
export default ListSong