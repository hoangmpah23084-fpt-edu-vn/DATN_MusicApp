



import React from 'react'
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { itemUser } from '../Interface/User';
import moment from 'moment';




type Props = {
    item: any
}
interface DataType {
    key: string;
    email: string;
    ten: string;
    chucvu: string;
    ngaytao: string;
}

const ItemUser = ({ item }: Props) => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Tên',
            dataIndex: 'ten',
            key: 'ten',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'chucvu',
            key: 'chucvu',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'ngaytao',
            key: 'ngaytao',
        },
    ];

    const data: DataType[] = item.map((item: itemUser) => ({
        key: item._id,
        email: item.email,
        ten: item.fullName,
        chucvu: item.role,
        ngaytao: moment(item.createdAt).format('DD-MM-YYYY'),
    }))

    return (
        <Table columns={columns} dataSource={data} scroll={{ y: 300 }} />
    )
}

export default ItemUser