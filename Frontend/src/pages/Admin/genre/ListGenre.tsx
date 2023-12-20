import { useAppDispatch, useAppSelector } from "@/store/hooks";
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
import { IApiSong, ifSong } from "../Interface/ValidateSong";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Skeleton } from "antd";
import { chekcSubString } from "@/constane/song.const";
import { AiFillEye, AiOutlinePlus } from "react-icons/ai";
import { handleGetSinger } from "@/store/Reducer/singerReducer";
import { getGenre, updateGenre } from "@/store/Reducer/genreReducer";
import { ifAddGenre, ifGenre } from "../Interface/validateAlbum";
import axios from "axios";
import { toast } from "react-toastify";
import GenreDetail from "./ModalDetail";

interface ifUpdateGenre {
  key: string,
  id: string,
  name: string,
  list_songs: ifSong[] | []
}

const ListGenre = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [openDetail, setOpenDetail] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const { genre, loading } = useAppSelector((state: RootState) => state.genre);

  const [form] = Form.useForm();
  const formRef = useRef<any>();
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [idGenre, setIdGenre] = useState<ifUpdateGenre | null>(null);
  const [detailsGenre, setDetailsGenre] = useState<ifGenre>();

  // get dữ liệu
  useEffect(() => {
    const data = {
      search: search
    }
    dispatch(getGenre(data));
  }, [search]);

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
    axios.delete(`http://localhost:8080/api/genre/${id}`).then(() => {
      message.success("Xóa thể loại thành công");
      dispatch(getGenre());
    }).catch(() => {
      message.success("Lỗi xóa thể loại");
    });
  };

  //cancel form
  const handleCancel = () => {
    setOpenDetail(false);
    setOpenAdd(false);
    setCheckUpdate(false);
    formRef.current.resetFields();
  };

  const handleGetDetail = (id: string) => {
    setIdGenre(id as any)
    setOpenDetail(true);
  };

  interface columns {
    key: string;
  }

  const dataSource = genre.map((item: ifGenre) => {
    return {
      key: item._id,
      id: chekcSubString(item._id as string, 5),
      name: chekcSubString(item.name as string, 20),
      list_songs: item.list_songs?.length,
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
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Số lượng bài hát",
      dataIndex: "list_songs",
      key: "list_songs",
      width: 100,
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
            onClick={() => handleEdit(record as any)}
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
            <Button className="ml-2" danger loading={loading}>
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
    { length: genre.length === 0 || genre.length > 10 ? 10 : genre.length },
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
    setOpenAdd(true);
    dispatch(handleGetSinger());
    dispatch(getGenre());
  };

  type FieldType = {
    name: string;
  };

  //call api khi sửa để đổ dữ liệu vào form
  //hàm sửa
  const handleEdit = async (item: any) => {
    console.log(item);

    setIdGenre(item);
    form.setFieldsValue(item);
    setOpenAdd(true);
    setCheckUpdate(true);
    dispatch(getGenre());
    setOpenDetail(false);
  };


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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        requiredMark="optional"
        className="w-full flex-1 relative"
        ref={formRef as any}
      >
        <Form.Item<FieldType>
          label="Tên thể loại"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên bài hát" }]}
        >
          <Input placeholder="A-z-0-9" allowClear className="" />
        </Form.Item>
        <div className="flex justify-end mt-10">
          <Button onClick={cancel} danger>
            Hủy
          </Button>
          <Button
            htmlType="submit"
            className="text-[#4a89ff] border-[#4a89ff] ml-4"
            loading={loading}
          >
            {checkUpdate ? "Cập nhật" : "Thêm"}
          </Button>
        </div>
      </Form>
    );
  };

  // hủy form
  const cancel = () => {
    setOpenAdd(false);
    setCheckUpdate(false);
    formRef.current.resetFields();
  };

  // hàm sử lý call api khi add
  const formAdd = (newData: ifAddGenre) => {
    axios.post('http://localhost:8080/api/genre', newData).then((data) => {
      formRef.current.resetFields();
      setOpenAdd(false);
      dispatch(getGenre());
      toast.success("Thêm thể loại thành công")
    }).catch((error) => {
      toast.warning(error.response.data.message)
    })
  };

  const formEdit = (newData: ifGenre) => {
    dispatch(updateGenre({
      _id: idGenre && idGenre.key,
      name: newData.name
    } as any))
      .unwrap()
      .then(() => {
        message.success(`Cập nhập thể loại thành công`);
        formRef.current.resetFields();
        setOpenAdd(false);
        dispatch(getGenre());
      })
      .catch((error) => {
        console.error("`Cập nhập thể loại thất bại:", error);
      });
  };


  const handleSubmit = (data: ifSong) => {
    const newData = {
      ...data,
    };
    if (checkUpdate) {
      formEdit(newData as any);

    } else {
      // hàm sử lý call api khi add
      formAdd(newData as any);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const modalAdd = () => {
    return (
      <Modal
        title={checkUpdate ? "Cập nhật bài thể loại" : "Thêm thể loại"}
        open={openAdd}
        onCancel={handleCancel}
        footer={null}
      >
        {formItem()}
      </Modal>
    );
  };



  const handleOk = () => {
    setOpenDetail(false)
  }

  return (
    <div className="relative">

      {modalAdd()}
      <header className="fixed top-0 flex items-center justify-between z-40 bg-[#F4F5F7] pt-2 w-[100%] pb-2.5 ">
        <span className="font-bold text-xl ml-10">Danh sách thể loại</span>
        <Input
          placeholder="Tìm kiếm thể loại"
          allowClear
          onChange={onChange}
          className="w-96 mr-40"
        />
        <Button
          onClick={() => showAdd()}
          className="flex items-center right-64 text-[#fff]  border-[#fff] bg-[#4a89ff] hover:bg-[#fff] hover:text-[#4a89ff]"
        >
          <AiOutlinePlus className="text-lg mr-1 " />
          Thêm thể loại
        </Button>
      </header>
      <main className="w">
        {loading ? (
          <div className="mt-32">{skeletonItems}</div>
        ) : (
          <Table
            dataSource={dataSource}
            columns={columns}
            className="mt-12"
            scroll={{ y: 650 }}
          />
        )}
      </main>
      <Modal
        title="Chi tiết Album"
        open={openDetail}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <GenreDetail idGenre={idGenre} />


      </Modal>

    </div>
  );
};
export default ListGenre;
