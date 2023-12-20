import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton } from "antd";
import instanceAxios from "@/utils/axios";
import { toast } from "react-toastify";


interface Props {
  idGenre: any
}

const GenreDetail = (props: Props) => {
  const { idGenre } = props;
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);




  const fetchData = async () => {
    try {
      const resp = await instanceAxios.get(
        `http://localhost:8080/api/genre/${idGenre}`
      );
      console.log(resp.data.data);
      setList(resp.data.data.list_songs);
      setData(resp.data.data.list_songs);
      setInitLoading(false);
    } catch (error) {
      toast.error(error as any);
    }
  };

  useEffect(() => {
    if(idGenre) {
      fetchData();
    }
  }, [idGenre]);

  const handleRemoveSong = async (item: any) => {
    try {
      const resp = await instanceAxios.put(
        `http://localhost:8080/api/songGenre/${idGenre}`,
        {
          id_song: item._id,
        }
      );

      toast.success(resp.data.message);
      fetchData();
    } catch (error) {
      toast.error(error as any);
    }
  };


  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[
            <span
              className="cursor-pointer"
              onClick={() => handleRemoveSong(item)}
              key="list-loadmore-edit"
            >
              Xóa
            </span>,
          ]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.song_image} />}
              title={item.song_name}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default GenreDetail;
