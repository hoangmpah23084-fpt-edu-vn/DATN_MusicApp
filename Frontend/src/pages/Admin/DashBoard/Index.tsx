import instanceAxios from "@/utils/axios";
import { Button, Card, Col, DatePicker, Row, Select, Modal } from "antd";
import Title from "antd/es/typography/Title";
import React, { PureComponent, useEffect, useState } from "react";
import { GiLoveSong } from "react-icons/gi";
import { BsJournalAlbum } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaUser, FaUserSecret } from "react-icons/fa";
import dayjs from "dayjs";
import { AiOutlineFall, AiOutlineWindows } from "react-icons/ai";
import ItemSong from "./itemSong";
import { itemSong } from "../Interface/ValidateSong";
import ItemUser from "./itemUser";
import { itemUser } from "../Interface/User";

const monthFormat = 'YYYY-MM';

const gridStyle: React.CSSProperties = {
  width: "100%",
  textAlign: "center",
  borderBottomLeftRadius: 9,
  borderBottomRightRadius: 9,
};



const Dashboard = () => {
  const [dataChart, setDataChart] = useState([] as any);
  const [statisticList, setStatisticList] = useState([] as any);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAuth, setIsModalOpenAuth] = useState(false);
  const [itemSong, setItemSong] = useState([] as itemSong[]);
  const [itemUser, setItemUser] = useState([] as itemUser[]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getItemSong = async () => {
    try {
      const resp = await instanceAxios.get(
        "http://localhost:8080/api/statistical/month-song");
      setItemSong(resp.data.data.items)
    } catch (error: any) {
      toast.error(error)
    }
  }


  const getItemUser = async () => {
    try {
      const resp = await instanceAxios.get(
        "http://localhost:8080/api/statistical/month-user");
      setItemUser(resp.data.data.items)
    } catch (error: any) {
      toast.error(error)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpenAuth(false)
  };

  const col = {
    curent: "Lượt nghe tháng trước",
  };

  const fectchData = async (params = {}) => {
    try {
      const today = new Date();

      const resp = await instanceAxios.post(
        "http://localhost:8080/api/statistical",
        params
      );

      const { ratingSong, ...rest } = resp.data.data;
      setStatisticList(rest);
      if (ratingSong) {
        const newData = ratingSong.map((item: any) => ({
          name: item.song_name,
          [col.curent]: item.view,

        }));

        setDataChart(newData);
      }
    } catch (error) {
      toast.error(error as any);
    }
  };

  useEffect(() => {
    fectchData();
    getItemSong();
    getItemUser()
  }, []);

  const handleChange = (value: string) => {
    fectchData({ time: value });
  };

  const optionMonth = [
    { value: '2023-1', label: 'Tháng 1' },
    { value: '2023-2', label: 'Tháng 2' },
    { value: '2023-3', label: 'Tháng 3' },
    { value: '2023-4', label: 'Tháng 4' },
    { value: '2023-5', label: 'Tháng 5' },
    { value: '2023-6', label: 'Tháng 6' },
    { value: '2023-7', label: 'Tháng 7' },
    { value: '2023-8', label: 'Tháng 8' },
    { value: '2023-9', label: 'Tháng 9' },
    { value: '2023-10', label: 'Tháng 10' },
    { value: '2023-11', label: 'Tháng 11' },
    { value: '2023-12', label: 'Tháng 12' },

  ]

  return (
    <div className="h-[1000px] mt-[94px]">
      <Modal title="Chi tiết bài hát theo tháng" open={isModalOpen} onCancel={handleCancel} footer={true} width={900}>
        <ItemSong item={itemSong} />
      </Modal>

      <Modal title="Chi tiết tài khoản theo tháng" open={isModalOpenAuth} onCancel={handleCancel} footer={true} width={900}>
        <ItemUser item={itemUser} />
      </Modal>
      <header className="fixed top-0  flex items-center justify-between z-40 bg-[#F4F5F7] pt-2 w-[100%] pb-2.5 ">
        <span className="font-bold text-2xl ml-10 py-[12px]">Thống kê</span>
      </header>
      <div className="mt-2">
        <span className="text-xl font-bold ml-2 flex items-center text-[#378696]"><span className="mr-2 text-2xl"><AiOutlineWindows /></span> Tổng quan </span>
        <Row className="rowgap-vbox mt-[10px] px-2" gutter={[16, 0]}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
            <Card bordered={false} className="criclebox">
              <Card.Grid style={{ ...gridStyle, borderBottom: `5px solid blue` }}>
                <Row>
                  <Col xs={10}>
                    <div className="min-w-[256px] text-left">
                      <div className="mb-[10px] w-fit text-[16px] font-bold text-[gray]">
                        Bài hát
                      </div>
                      <Title
                        level={3}
                        className="flex items-center text-[25px] text-[gray]"
                      >
                        <GiLoveSong className="text-[20px] mr-[8px]" />{" "}
                        {statisticList.totalSong}
                      </Title>
                    </div>
                  </Col>
                </Row>
              </Card.Grid>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
            <Card bordered={false} className="criclebox">
              <Card.Grid style={{ ...gridStyle, borderBottom: `5px solid yellow ` }}>
                <Row>
                  <Col xs={10}>
                    <div className="min-w-[256px] text-left">
                      <div className="mb-[10px] w-fit text-[16px] font-bold text-[gray]">
                        Ca sĩ
                      </div>
                      <Title
                        level={3}
                        className="flex items-center text-[25px] text-[gray]"
                      >
                        <FaUserSecret className="text-[20px] mr-[8px]" />{" "}
                        {statisticList.totalSinger}
                      </Title>
                    </div>
                  </Col>
                </Row>
              </Card.Grid>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
            <Card bordered={false} className="criclebox">
              <Card.Grid style={{ ...gridStyle, borderBottom: `5px solid red` }}>
                <Row>
                  <Col xs={10}>
                    <div className="min-w-[256px] text-left">
                      <div className="mb-[10px] w-fit text-[16px] font-bold text-[gray]">
                        Album
                      </div>
                      <Title
                        level={3}
                        className="flex items-center text-[25px] text-[gray]"
                      >
                        <BsJournalAlbum className="text-[20px] mr-[8px]" />{" "}
                        {statisticList.totalAlbum}
                      </Title>
                    </div>
                  </Col>
                </Row>
              </Card.Grid>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
            <Card bordered={false} className="criclebox">
              <Card.Grid
                style={{ ...gridStyle, borderBottom: `5px solid green` }}
              >
                <Row>
                  <Col xs={10}>
                    <div className="min-w-[256px] text-left">
                      <div className="mb-[10px] w-fit text-[16px] font-bold text-[gray]">
                        Khách hàng
                      </div>
                      <Title
                        level={3}
                        className="flex items-center text-[25px] text-[gray]"
                      >
                        <FaUser className="text-[20px] mr-[8px]" />{" "}
                        {statisticList.totalUser}
                      </Title>
                    </div>
                  </Col>
                </Row>
              </Card.Grid>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="mt-8">
        <span className="text-xl font-bold ml-2 flex items-center text-[#378696]"><span className="mr-2 text-2xl"><AiOutlineFall /></span>Thống kê theo tháng </span>
        <Row className="rowgap-vbox mt-[10px] px-2" gutter={[16, 0]}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
            <Card bordered={false} className="criclebox">
              <Card.Grid style={{ ...gridStyle, borderBottom: `5px solid brown` }}>
                <Row>
                  <Col xs={10}>
                    <div className="min-w-[300px] text-left">
                      <div className="mb-[10px] w-fit text-[16px] font-bold text-[gray]">
                        Bài hát
                      </div>
                      <div className="flex items-center justify-between">
                        <Title
                          level={3}
                          className="flex items-center text-[25px] text-[gray]"
                        >
                          <GiLoveSong className="text-[20px] mr-[8px]" />{" "}
                          {itemSong.length}
                        </Title>
                        <Button className="" onClick={() => showModal()}>
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Grid>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
            <Card bordered={false} className="criclebox">
              <Card.Grid style={{ ...gridStyle, borderBottom: `5px solid Violet ` }}>
                <Row>
                  <Col xs={10}>
                    <div className="min-w-[300px] text-left">
                      <div className="mb-[10px] w-fit text-[16px] font-bold text-[gray]">
                        Khách hàng
                      </div>
                      <div className="flex items-center justify-between">
                        <Title
                          level={3}
                          className="flex items-center text-[25px] text-[gray]"
                        >
                          <FaUserSecret className="text-[20px] mr-[8px]" />{" "}
                          {itemUser.length}
                        </Title>
                        <Button className="" onClick={() => setIsModalOpenAuth(true)}>
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Grid>
            </Card>
          </Col>
        </Row>
      </div>

      <h1 className="text-center my-[24px] text-[16px]">
        Bảng xếp hạng lượt nghe theo tháng :    <Select
          defaultValue="2023-11"
          style={{ width: 120 }}
          onChange={handleChange}
          options={optionMonth}
        />
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={600}
          height={300}
          data={dataChart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            activeDot={{ r: 8 }}
            dataKey={col.curent}
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
