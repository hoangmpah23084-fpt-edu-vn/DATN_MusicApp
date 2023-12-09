import instanceAxios from "@/utils/axios";
import { Card, Col, Row } from "antd";
import Title from 'antd/es/typography/Title'
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
import { FaUser } from "react-icons/fa";


const gridStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  borderBottomLeftRadius: 9,
  borderBottomRightRadius: 9
}

const Dashboard = () => {
  const [dataChart, setDataChart] = useState([] as any);
  const [statisticList, setStatisticList] = useState([] as any);

  const col = {
    curent: "Lượt nghe tháng trước",
    prev: "Lượt nghe tháng này",
  };

  const fectchData = async () => {
    try {
  const today = new Date();
    let monthYear = `${today.getFullYear()}-${Number(today.getMonth()) + 1}`

      
      const resp = await instanceAxios.get(
        "http://localhost:8080/api/statistical"
      );

      const {ratingSong , ...rest} = resp.data.data
      setStatisticList(rest);
      if (ratingSong) {
        const newData = ratingSong.map((item: any) => ({
          name: item.song_name,
          [col.curent]: item.view,
          [col.prev]: JSON.parse(item.month)[monthYear],
        }));

        setDataChart(newData);
      }
    } catch (error) {
      toast.error(error as any);
    }
  };

  useEffect(() => {
    fectchData();
  }, []);

  console.log(statisticList)

  return (
   <div className="h-[1000px] mt-[32px]">

<Row className="rowgap-vbox" gutter={[16, 0]}>
      
           <Col xs={24} sm={24} md={12} lg={6} xl={6}>
           <Card bordered={false} className="criclebox">
             <Card.Grid
               style={{ ...gridStyle, borderBottom: `5px solid blue` }}
             >
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
                       <GiLoveSong  className='text-[20px] mr-[8px]' /> {statisticList.totalSong}
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
               style={{ ...gridStyle, borderBottom: `5px solid red` }}
             >
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
                       <BsJournalAlbum className='text-[20px] mr-[8px]' /> {statisticList.totalAlbum}
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
                       <FaUser className='text-[20px] mr-[8px]' /> {statisticList.totalUser}
                     </Title>
                   </div>
                 </Col>
               </Row>
             </Card.Grid>
           </Card>
         </Col>
    
      </Row>

    <h1 className="text-center my-[24px]">Bảng xếp hạng lượt nghe tháng trước</h1>
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
          dataKey={col.prev}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" activeDot={{ r: 8 }} dataKey={col.curent} stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
   </div>
  );
};

export default Dashboard;
