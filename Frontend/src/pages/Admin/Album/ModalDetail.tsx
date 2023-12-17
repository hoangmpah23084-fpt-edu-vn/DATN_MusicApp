import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import instanceAxios from '@/utils/axios';
import { toast } from 'react-toastify';



const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

interface Props {
    albumSelected: any,
    fetchData: () => void
}

const AlbumDetail = (props: Props) => {
    const { albumSelected } = props
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [list, setList] = useState<any[]>([]);


    const onLoadMore = async () => {
        setLoading(true);
        try {
            const resp = await instanceAxios.get(`http://localhost:8080/api/album/${albumSelected._id}`)
            console.log(resp.data.data)
            setList(resp.data.data.list_song)
            setData(resp.data.data.list_song)
            setInitLoading(false);
        } catch (error) {
            toast.error(error as any)
        }
        
    };


    const fetchData = async () => {
        try {
            const resp = await instanceAxios.get(`http://localhost:8080/api/album/${albumSelected._id}`)
            console.log(resp.data.data)
            setList(resp.data.data.list_song)
            setData(resp.data.data.list_song)
            setInitLoading(false);
        } catch (error) {
            toast.error(error as any)
        }
    }

    useEffect(() => {
        fetchData()
    }, [albumSelected])

    const handleRemoveSong =async (item:any) => {
        console.log(item._id)
        try {
             const resp = await instanceAxios.put(`http://localhost:8080/api/album/delete/song/${albumSelected._id}`,{
                id_song: item._id
             })

             toast.success(resp.data.message)
             fetchData()
        } catch (error) {
            toast.error(error as any)
        }
    }

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;

    return (
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
                <List.Item
                    actions={[<span className='cursor-pointer' onClick={() => handleRemoveSong(item)} key="list-loadmore-edit">Xóa</span>]}
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

export default AlbumDetail;