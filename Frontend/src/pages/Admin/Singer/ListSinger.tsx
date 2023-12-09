import {
  handleAddSinger,
  handleDeletesinger,
  handleGetOne,
  handleGetSinger,
  handleUpdateSinger
} from "@/store/Reducer/singerReducer";
import { useAppDispatch } from "@/store/hooks";
import {
  Pagination,
  Table,
  Button,
  message,
  Popconfirm,
  Modal,
  Form,
  Upload,
  Select,
  UploadFile,
} from "antd";
import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { IApiSinger, ISinger } from "../Interface/ISinger";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Skeleton } from "antd";
import { chekcSubString } from "@/constane/song.const";
import { AiFillEye, AiOutlinePlus } from "react-icons/ai";
import { handImage } from "@/Mui/Component/handUpload";
import { SongLink } from "../Interface/ValidateSong";
import { getAlbum } from "@/store/Reducer/albumReducer";

const { Option } = Select;
const ListSinger = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [openDetail, setOpenDetail] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const {
    singer,
    totalSinger,
    loading,
    loadingRemove,
    loadingGetone,
    dataOne,
    loadingAdd,
  } = useSelector((state: RootState) => state.singer);
  const { album } = useSelector((state: RootState) => state.album);
  const [imageForm, setImageForm] = useState<SongLink[]>([]);
  const [songForm, setSongForm] = useState<SongLink>({ name: "", value: "" });
  const [form] = Form.useForm();
  const formRef = useRef<any>();
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [fileListImage, setFileListImage] = useState<UploadFile[]>(null as any);
  const [fileListFile, setFileListFile] = useState<UploadFile[]>(null as any);

  // get dữ liệu
  useEffect(() => {
    const data: IApiSinger = {
      page: page,
      pageSize: pageSize,
      search: search,
    };
    dispatch(handleGetSinger(data));
  }, [page, pageSize, search]);

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
    await dispatch(handleDeletesinger(id));
    message.success("Xóa ca sĩ thành công");
  };

  //cancel form
  const handleCancel = () => {
    setOpenDetail(false);
    setOpenAdd(false);
    setCheckUpdate(false);
    formRef.current.resetFields();
  };

  const handleGetDetail = (id: string) => {
    setOpenDetail(true);
    dispatch(handleGetOne(id));
  };

  interface columns {
    key: string;
  }

  const dataSource = singer.map((item: ISinger) => {
    return {
      key: item._id,
      id: chekcSubString(item._id as string, 5),
      ten: chekcSubString(item.name as string, 20),
      tuoi: item.age,
      anh: <img src={item.images[0]} className="w-14 h-14 rounded-xl" />,
      mota: chekcSubString(item.description as string, 255),
      album: item.album.name,
      song: item.songs.name
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
      title: "Tuổi",
      dataIndex: "tuoi",
      key: "tuoi",
      width: 100,
    },
    {
      title: "Ảnh",
      dataIndex: "anh",
      key: "anh",
      width: 100,
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
      key: "mota",
      width: 150,
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      width: 150,
    },
    {
      title: "Bài hát",
      dataIndex: "songs",
      key: "songs",
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
            title="Xóa ca sĩ"
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
    { length: singer.length === 0 || singer.length > 10 ? 10 : singer.length },
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

  // upload
  const uploadImg = async ({ file, onSuccess, onError }: any) => {
    try {
      const imageUrl = await handImage([file]);
      message.success(`${file.name} file uploaded successfully`);
      onSuccess();

      if (imageUrl) {
        const newData = {
          uid: "-1",
          name: imageUrl[0],
          status: "done",
          url: imageUrl[0],
        };

        // setImageForm((value: any) => [...value, newData]);
        setFileListImage((value: any) => [...value, newData]);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      onError(error);
    }
  };

  //xóa
  const onRemoveImg = (file: UploadFile<any>) => {
    console.log(file);
    const filterItem = fileListImage.filter(
      (item: any) => item.url !== file.url
    );
    if (filterItem) {
      setFileListImage(filterItem);
    }

    if(filterItem.length == 0) {
      setFileListImage([])
     // form.setFieldValue("images",undefined)
    }
  };

  // hàm show form
  const showAdd = () => {
    setFileListImage([]);
    setOpenAdd(true);
    dispatch(handleGetSinger());
    dispatch(getAlbum());
  };

  type FieldType = {
    name: string;
    age: number;
    images: string[];
    description: string;
    album: string;
    // song: string;
  };

  //call api khi sửa để đổ dữ liệu vào form
  //hàm sửa
  const handleEdit = async (id: string) => {
    setOpenAdd(true);
    setCheckUpdate(true);
    await dispatch(handleGetOne(id));
    // dispatch(handGetAlbum());
    // dispatch(getGenre());
    setOpenDetail(false);
  };
  useEffect(() => {
    const newFileImage = dataOne?.images.map((item) => ({
      uid: "-1",
      name: item,
      status: "done",
      url: item,
    }));

    if (newFileImage) {
      setFileListImage(newFileImage as any);
    }
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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        requiredMark="optional"
        className="w-full flex-1 relative"
        ref={formRef as any}
      >
        <Form.Item<FieldType>
          label="Tên ca sĩ"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên ca sĩ" }]}
        >
          <Input placeholder="A-z-0-9" allowClear className="" />
        </Form.Item>

        <Form.Item<FieldType>
          label="tuổi"
          name="age"
          rules={[{ required: true, message: "Vui lòng nhập tuổi" }]}
        >
          <Input placeholder="A-z-0-9" allowClear className="" />
        </Form.Item>

        <Form.Item
          name="images"
          rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
        >
          <Upload
            multiple
            listType="picture"
            customRequest={uploadImg}
            onRemove={onRemoveImg}
            className="w-full min-w-0"
            fileList={fileListImage}
          >
            <Button className="w-full">Tải lên ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item<FieldType>
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập phần mô tả" }]}
        >
          <Input placeholder="A-z-0-9" allowClear className="" />
        </Form.Item>

        <div className="flex justify-center items-center w-full">
          <Form.Item<FieldType>
            name="album"
            label="Album"
            rules={[{ required: true, message: "Vui lòng chọn album" }]}
            className="w-full min-w-0"
          >
            {/* <Select defaultValue="Chọn album" style={{ width: "48%" }}>
              {singer.map((item: ifAlbum) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select> */}
          </Form.Item>
        </div>

        <div className="flex justify-end mt-10">
          <Button onClick={cancel} danger>
            Hủy
          </Button>
          <Button
            htmlType="submit"
            className="text-[#4a89ff] border-[#4a89ff] ml-4"
            loading={loadingAdd}
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
  const formAdd = (newData: ISinger) => {
    newData = {
      ...newData,
      images: (fileListImage?.map((item) => item.url) as string[]) || [],
    };

    dispatch(handleAddSinger(newData as ISinger))
      .unwrap()
      .then(() => {
        message.success("Thêm ca sĩ thành công");
        formRef.current.resetFields();
        setImageForm([]);
        setSongForm({
          name: "",
          value: "",
        });
        setOpenAdd(false);
        const dataGet: IApiSinger = {
          page: page,
          pageSize: pageSize,
          search: search,
        };
        dispatch(handleGetSinger(dataGet));
      })
      .catch((error) => {
        console.error("Thêm ca sĩ thất bại:", error);
      });
  };

  const formEdit = (newData: ISinger) => {
    newData = {
      ...newData,
      _id: dataOne?._id,
      images: (fileListImage?.map((item) => item.url) as string[]) || [],
    };

    dispatch(handleUpdateSinger(newData as ISinger))
      .unwrap()
      .then(() => {
        message.success("Cập nhập ca sĩ thành công");
        formRef.current.resetFields();
        setImageForm([]);
        setSongForm({
          name: "",
          value: "",
        });
        setOpenAdd(false);
        const dataGet: IApiSinger = {
          page: page,
          pageSize: pageSize,
          search: search,
        };
        dispatch(handleGetSinger(dataGet));
      })
      .catch((error) => {
        console.error("Cập nhập ca sĩ thất bại:", error);
      });
  };

  const handleSubmit = (data: ISinger) => {
    const newData = {
      ...data,
      song_link: fileListFile[0].url,
      images: fileListImage,
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
        title={checkUpdate ? "Cập nhật ca sĩ" : "Thêm ca sĩ"}
        open={openAdd}
        onCancel={handleCancel}
        footer={null}
      >
        {formItem()}
      </Modal>
    );
  };

  const modalDetail = () => {
    return (
      <Modal
        title="Chi tiết ca sĩ"
        open={openDetail}
        onOk={() => handleEdit(dataOne?._id as string)}
        onCancel={handleCancel}
        okText="Chỉnh sửa"
        cancelText="Thoát"
        okType="danger"
        width={600}
      >
        {loadingGetone ? (
          <Skeleton active />
        ) : (
          <div className="flex items-center justify-between pt-5 pb-5">
            <div>
              <p>
                <strong>ID:</strong> {dataOne?._id}
              </p>
              <p>
                <strong>Tên ca sĩ:</strong> {dataOne?.name}
                {chekcSubString(dataOne?.name as string, 20)}
              </p>
              <p>
                <strong>Tuổi:</strong> 
              </p>
              <p>
                <strong>Mô tả: </strong>
                {chekcSubString(dataOne?.description as string, 255)}
              </p>
            </div>
            {dataOne?.images.map((item) => (
              <img src={item} className="w-32 h-32 rounded-xl" />
            ))}
          </div>
        )}
      </Modal>
    );
  };

  return (
    <div className="relative">
      {modalDetail()}
      {modalAdd()}
      <header className="fixed top-0 flex items-center justify-between z-40 bg-[#F4F5F7] pt-2 w-[100%] pb-2.5 ">
        <span className="font-bold text-xl ml-10">Danh sách ca sĩ</span>
        <Input
          placeholder="Tìm kiếm ca sĩ"
          allowClear
          onChange={onChange}
          className="w-96 mr-40"
        />
        <Button
          onClick={() => showAdd()}
          className="flex items-center right-64 text-[#fff]  border-[#fff] bg-[#4a89ff] hover:bg-[#fff] hover:text-[#4a89ff]"
        >
          <AiOutlinePlus className="text-lg mr-1" />
          Thêm ca sĩ
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
          total={totalSinger || 1}
          onChange={onChangePage}
          className="absolute bottom-1 right-72 z-50"
        />
      </footer>
    </div>
  );
};

export default ListSinger;