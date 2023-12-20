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
import { FaEye } from "react-icons/fa";
import AlbumDetail from "./ModalDetail";
const { Option } = Select;

const AlbumAdmin = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [album, setAlbum] = useState([] as any);
  const [modalSetting, setModalSetting] = useState(0);
  const [albumSelected, setAlbumSelected] = useState({} as any);
  const [optionSinger, setOptionSinger] = useState([]);
  const [optionSong, setOptionSong] = useState([]);
  const [listSong, setListSong] = useState([])

  const { song, totalSong, loading, loadingRemove, dataOne, loadingAdd } =
    useSelector((state: RootState) => state.Song);

  const [form] = Form.useForm();
  const formRef = useRef<any>();

  const fetchData = async () => {
    try {
      const resp = await instanceAxios.get("http://localhost:8080/api/album");
      setAlbum(resp.data.data);
    } catch (error) {
      toast.error(error as any);
    }
  };

  const fetchSinger = async () => {
    try {
      const resp = await instanceAxios.get("http://localhost:8080/api/singers");
      const newOption = resp.data.data.map((item: any) => ({
        value: item._id,
        label: item.name,
      }));

      setOptionSinger(newOption);
    } catch (error) {
      toast.error(error as any);
    }
  };

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
    fetchData();
    fetchSinger();
  }, []);

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
    try {
      const resp = await instanceAxios.delete(
        `http://localhost:8080/api/album/${id}`
      );
      toast.success(resp.data.message);
      fetchData();
    } catch (error) {
      toast.error(error as any);
    }
  };

  const onDetail = (record: any) => {
    setAlbumSelected(record);
    setModalSetting(3);
  };

  const handleOk = () => {
    setModalSetting(0);
  };

  const handleCancel = () => {
    setModalSetting(0);
  };

  interface columns {
    key: string;
  }

  const dataSource = album.map((item: ifSong, index: number) => {
    return {
      key: index + 1,
      ...item,
    };
  });
  const columns: any = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 100,
    },
    {
      title: "Tên Album",
      dataIndex: "album_name",
      key: "album_name",
      width: 200,
    },
    {
      title: "Ca sĩ",
      dataIndex: "id_singer",
      key: "id_singer",
      width: 200,
      render: (_: any, record: any) => <p>{_.name}</p>,
    },

    {
      title: "Chức năng",
      dataIndex: "chucnang",
      key: "chucnang",
      render: (_: any, record: columns) => (
        <div className="flex justify-center items-center">
          {/* <Button onClick={() => handleGetDetail(record?.key as string)}>
            <AiFillEye className="text-xl text-[#4a89ff] cursor-pointer" />
          </Button> */}

          <Button
            className="ml-2 text-[#699af4db]"
            onClick={() => onDetail(record as string)}
          >
            <FaEye />
          </Button>

          <Button
            className="ml-2 text-[#699af4db]"
            onClick={() => handleEdit(record as string)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa bài hát"
            description="Bạn chắc chắn muốn xóa chứ ?"
            onConfirm={() => confirm(record?._id as string)}
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
    setModalSetting(1);
    setAlbumSelected({});
    form.resetFields();
  };

  //call api khi sửa để đổ dữ liệu vào form
  //hàm sửa
  const handleEdit = async (recode: any) => {
    setModalSetting(2);
    const newValue = {
      _id: recode._id,
      album_name: recode.album_name,
      id_singer: recode.id_singer._id,
    };
    setAlbumSelected(newValue);
  };
  useEffect(() => {
    console.log(albumSelected);
    form.setFieldsValue(albumSelected);
  }, [albumSelected]);

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
          label="Tên Album"
          name="album_name"
          rules={[{ required: true, message: "Vui lòng nhập tên bài hát" }]}
        >
          <Input size="large" placeholder="A-z-0-9" allowClear className="" />
        </Form.Item>
        <Form.Item
          name="id_singer"
          label="Ca sĩ"
          rules={[{ required: true, message: "Vui lòng chọn ca sĩ" }]}
          className="w-full min-w-0"
        >
          <Select
            allowClear
            showSearch
            placeholder="Chọn ca sĩ"
            options={optionSinger}
            className="w-full"
          ></Select>
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

  const handleSubmit = async (data: ifSong) => {
    if (albumSelected._id) {
      const resp = await instanceAxios.put(
        `http://localhost:8080/api/album/${albumSelected._id}`,
        data
      );
      toast.success(resp.data.message);
    } else {
      try {
        const resp = await instanceAxios.post(
          "http://localhost:8080/api/album",
          data
        );
        toast.success(resp.data.message);
      } catch (error) {
        toast.error(error as any);
      }
    }

    setModalSetting(0);
    fetchData();
  };

  const fetchDataSong = async () => {
    try {
      const resp = await instanceAxios.get(`http://localhost:8080/api/singer/${albumSelected.id_singer._id}`);
      console.log(resp)
      if (resp?.data?.data) {
        const newData = resp.data.data.songs.map((item: any) => ({
          value: item._id,
          label: item.song_name,
        }));

        setOptionSong(newData);
      }
    } catch (error) {
      toast.error(error as any);
    }
  };

  useEffect(() => {
    if(albumSelected?.id_singer?._id) {
      fetchDataSong()
    }
  }, [albumSelected])

  const modalAdd = () => {
    return (
      <Modal
        title={modalSetting == 2 ? "Cập nhật bài hát" : "Thêm bài hát"}
        open={modalSetting != 0}
        onCancel={() => setModalSetting(0)}
        footer={null}
      >
        {formItem()}
      </Modal>
    );
  };

  const handleAddSong = async () => {
    for (const item of listSong) {
      try {
        const resp = await instanceAxios.put(`http://localhost:8080/api/album/song/${albumSelected._id}`, {
          id_song: item
        })

        toast.success(resp.data.message)

      } catch (error) {
        toast.error(error as any)
      }
    }
    fetchData()
    setListSong([])
    setModalSetting(0)
  }

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

      <Modal
        title="Chi tiết Album"
        open={modalSetting == 3}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AlbumDetail fetchData={fetchData} albumSelected={albumSelected} />
        <div>
          <Button onClick={() => handleAddSong()} className="mb-[12px]">Thêm bài hát</Button>

          <Select
            allowClear
            showSearch
            mode="multiple"
            size={"large"}
            placeholder="Please select"
            onChange={(e) => setListSong(e)}
            style={{ width: "100%" }}
            value={listSong}
            options={optionSong}
          />


        </div>
      </Modal>
    </div>
  );
};
export default AlbumAdmin;
