

import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { itemSong } from '../Interface/ValidateSong';
import moment from 'moment';
type Props = {
    item: itemSong[]
}

const ItemSong = ({ item }: Props) => {
    interface DataType {
        key: string;
        tenbaihat: string;
        casi: string;
        theloai: string;
        ngaytao: string;
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên bài hát',
            dataIndex: 'tenbaihat',
            key: 'tenbaihat',
        },
        {
            title: 'Ca sĩ',
            dataIndex: 'casi',
            key: 'casi',
        },
        {
            title: 'Thể loại',
            dataIndex: 'theloai',
            key: 'theloai',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'ngaytao',
            key: 'ngaytao',
        },
    ];

    const data: DataType[] = item.map((item: itemSong) => ({
        key: item._id,
        tenbaihat: item.song_name,
        casi: item.id_Singer.name,
        theloai: item.id_Genre.name,
        ngaytao: moment(item.createdAt).format('DD-MM-YYYY'),
    }))
    return (
        <Table columns={columns} dataSource={data} scroll={{ y: 300 }} />
    )
}

export default ItemSong