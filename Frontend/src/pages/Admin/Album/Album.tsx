import {
  handAddSong,
  handDeleteSong,
  handGetOne,
  handGetSong,
  handUpdateSong,
} from "@/store/Reducer/Song";
import { useAppDispatch } from "@/store/hooks";
import {
  Pagination,
  Table,
  Button,
  message,
  Popconfirm,
  Modal,
  Form,
  Select,
} from "antd";
import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { IApiSong, SongLink, ifSong } from "../Interface/ValidateSong";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Skeleton } from "antd";
import { chekcSubString } from "@/constane/song.const";
import { AiFillEye, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import instanceAxios from "@/utils/axios";
const { Option } = Select;

const AlbumAdmin = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [album,setAlbum] = useState([] as any)
  const [modalSetting, setModalSetting] = useState(0);
  const [albumSelected,setAlbumSelected] = useState({} as any)
  const {
    song,
    totalSong,
    loading,
    loadingRemove,
    loadingGetone,
    dataOne,
    loadingAdd,
  } = useSelector((state: RootState) => state.Song);


  const [form] = Form.useForm();
  const formRef = useRef<any>();


  const fetchData = async () => {
    try {
      const resp = await instanceAxios.get("http://localhost:8080/api/album")
      setAlbum(resp.data.data)
    } catch (error) {
      toast.error(error as any)
    }
  }



  // get dữ liệu
  useEffect(() => {
    const data: IApiSong = {
      page: page,
      pageSize: pageSize,
      search: search,
    };
    dispatch(handGetSong(data));
  }, [page, pageSize, search]);

  useEffect(() => {
    fetchData()
  },[])

  // tìm kiếm
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  //phân trang
  const onChangePage = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  //xóa
  const confirm = async (id: string) => {
    await dispatch(handDeleteSong(id));
    message.success("Xóa bài hát thành công");
  };

  //cancel form
  const handleCancel = () => {
    formRef.current.resetFields();
  };

  const handleGetDetail = (id: string) => {
    setOpenDetail(true);
    dispatch(handGetOne(id));
  };

  interface columns {
    key: string;
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
    };
  });
  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
      width: 200,
    },
    {
      title: "Ảnh",
      dataIndex: "anh",
      key: "anh",
      width: 100,
    },
    {
      title: "Ca sĩ",
      dataIndex: "casi",
      key: "casi",
      width: 150,
    },
    {
      title: "Lượt nghe",
      dataIndex: "luotnghe",
      key: "luotnghe",
      width: 150,
    },
    {
      title: "Lượt yêu thích",
      dataIndex: "yeuthich",
      key: "yeuthich",
      width: 200,
    },
    {
      title: "Chức năng",
      dataIndex: "chucnang",
      key: "chucnang",
      render: (_: any, record: columns) => (
        <div className="flex justify-center items-center">
          <Button onClick={() => handleGetDetail(record?.key as string)}>
            <AiFillEye className="text-xl text-[#4a89ff] cursor-pointer" />
          </Button>
          <Button
            className="ml-2 text-[#699af4db]"
            onClick={() => handleEdit(record?.key as string)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa bài hát"
            description="Bạn chắc chắn muốn xóa chứ ?"
            onConfirm={() => confirm(record?.key as string)}
            okText="xóa"
            cancelText="Không"
            placement="topRight"
            okType="danger"
          >
            <Button className="ml-2" danger loading={loadingRemove}>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
      fixed: "right",
      width: 170,
      align: "center",
    },
  ];
  const skeletonItems = Array.from(
    { length: song.length === 0 || song.length > 10 ? 10 : song.length },
    () => {
      return (
        <div className="mt-10 w-full">
          <Skeleton.Input
            active
            className="ml-2 max-h-4"
            size="large"
            style={{ borderRadius: "40px" }}
          />
          <Skeleton.Input
            active
            className="ml-2 max-h-4"
            size="small"
            style={{ borderRadius: "40px" }}
          />
          <Skeleton.Input
            active
            className="ml-2 max-h-4"
            size="large"
            style={{ borderRadius: "40px" }}
          />
          <Skeleton.Input
            active
            className="ml-2 max-h-4"
            size="small"
            style={{ borderRadius: "40px" }}
          />
          <Skeleton.Input
            active
            className="ml-2 max-h-4"
            size="large"
            style={{ borderRadius: "40px" }}
          />
          <Skeleton.Input
            active
            className="ml-2 max-h-4"
            size="small"
            style={{ borderRadius: "40px" }}
          />
          <Skeleton.Input
            active
            className="ml-2 max-h-4"
            size="small"
            style={{ borderRadius: "40px" }}
          />
          <Skeleton.Input
            active
            className="ml-2 max-h-4"
            size="small"
            style={{ borderRadius: "40px" }}
          />
        </div>
      );
    }
  );

  // hàm show form
  const showAdd = () => {
    setModalSetting(1)
  };

  //call api khi sửa để đổ dữ liệu vào form
  //hàm sửa
  const handleEdit = async (recode:any) => {
    setModalSetting(2)
  };
  useEffect(() => {
    form.setFieldsValue(dataOne);
  }, [dataOne]);

  // form dùng chung add và update
  const formItem = () => {
    return (
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        requiredMark="optional"
        className="w-full flex-1 relative"
        ref={formRef as any}
      >
        <Form.Item
          label="Tên bài hát"
          name="song_name"
          rules={[{ required: true, message: "Vui lòng nhập tên bài hát" }]}
        >
          <Input placeholder="A-z-0-9" allowClear className="" />
        </Form.Item>
        <Form.Item
          label="Tiêu đề bài hát"
          name="song_title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề bài hát" }]}
        >
          <Input placeholder="A-z-0-9" allowClear className="" />
        </Form.Item>


        <Form.Item
          name="id_Singer"
          label="Ca sĩ"
          rules={[{ required: true, message: "Vui lòng chọn ca sĩ" }]}
          className="w-full min-w-0"
        >
          <Select defaultValue="Chọn ca sĩ" style={{ width: "48%" }}>


          </Select>
        </Form.Item>





        <div className="flex justify-end mt-10">
          <Button onClick={cancel} danger>
            Hủy
          </Button>
          <Button
            htmlType="submit"
            className="text-[#4a89ff] border-[#4a89ff] ml-4"
            loading={loadingAdd}
          >
            {true ? "Cập nhật" : "Thêm"}
          </Button>
        </div>
      </Form>
    );
  };

  // hủy form
  const cancel = () => {
    formRef.current.resetFields();
  };

  // hàm sử lý call api khi add





  const handleSubmit = (data: ifSong) => {


    if (true) {

    } else {
      // hàm sử lý call api khi add

    }
  };



  const modalAdd = () => {
    return (
      <Modal
        title={true ? "Cập nhật bài hát" : "Thêm bài hát"}
        open={false}
        onCancel={handleCancel}
        footer={null}
      >
        {formItem()}
      </Modal>
    );
  };


  return (
    <div className="relative">
      {modalAdd()}
      <header className="fixed top-0 flex items-center justify-between z-40 bg-[#F4F5F7] pt-2 w-[100%] pb-2.5 ">
        <span className="font-bold text-xl ml-10">Danh sách Album</span>
        <Input
          placeholder="Tìm kiếm bài hát"
          allowClear
          onChange={onChange}
          className="w-96 mr-40"
        />
        <Button
          onClick={() => showAdd()}
          className="flex items-center right-64 text-[#fff]  border-[#fff] bg-[#4a89ff] hover:bg-[#fff] hover:text-[#4a89ff]"
        >
          <AiOutlinePlus className="text-lg mr-1 " />
          Thêm album
        </Button>
      </header>
      <main className="w">
        {loading ? (
          <div className="mt-32">{skeletonItems}</div>
        ) : (
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            className="mt-12"
            scroll={{ y: 650 }}
          />
        )}
      </main>
      <footer className="w-[100%] h-10 bg-[#F4F5F7] fixed bottom-0 z-50">
        <Pagination
          defaultCurrent={page}
          total={totalSong || 1}
          onChange={onChangePage}
          className="absolute bottom-1 right-72   z-50"
        />
      </footer>
    </div>
  );
};
export default AlbumAdmin;
