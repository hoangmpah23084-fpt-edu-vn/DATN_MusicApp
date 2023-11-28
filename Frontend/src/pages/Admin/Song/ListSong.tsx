import { handDeleteSong, handGetSong } from "@/store/Reducer/Song";
import { useAppDispatch } from "@/store/hooks";
import { Pagination, Table, Button, message, Popconfirm } from "antd";
import { Input } from 'antd';
import { useEffect, useState } from "react";
import { IApiSong, ifSong } from "../Interface/ValidateSong";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Skeleton } from 'antd';
import { chekcSubString } from "@/constane/song.const";
import { AiFillEye } from 'react-icons/ai'

const ListSong = () => {

  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [search, setSearch] = useState<string>("")

  const { song, totalSong, loading, loadingRemove } = useSelector((state: RootState) => state.Song)

  useEffect(() => {
    const data: IApiSong = {
      page: page,
      pageSize: pageSize,
      search: search
    }
    dispatch(handGetSong(data))

  }, [page, pageSize, search])
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value)
  };

  const onChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  };

  const dataSource = song.map((item: ifSong) => {
    return {
      key: item._id,
      id: chekcSubString(item._id as string, 5),
      ten: chekcSubString(item.song_name as string, 20),
      anh: <img src={item.song_image[0]} className="w-14 h-14" />,
      casi: item.song_singer,
      luotnghe: item.view_song,
      yeuthich: item.total_like,

    }
  })

  const confirm = async (id: string) => {
    await dispatch(handDeleteSong(id))
    message.success('Xóa bài hát thành công');
  };
  const handleEdit = (id: string) => {
    console.log(id);
  }

  interface columns {
    key: string
  }

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Tên',
      dataIndex: 'ten',
      key: 'ten',
      width: 200,
    },
    {
      title: 'Ảnh',
      dataIndex: 'anh',
      key: 'anh',
      width: 100,
    },
    {
      title: 'Ca sĩ',
      dataIndex: 'casi',
      key: 'casi',
      width: 150,

    },
    {
      title: 'Lượt nghe',
      dataIndex: 'luotnghe',
      key: 'luotnghe',
      width: 150,
    },
    {
      title: 'Lượt yêu thích',
      dataIndex: 'yeuthich',
      key: 'yeuthich',
      width: 200,
    },
    {
      title: 'Chức năng',
      dataIndex: 'chucnang',
      key: 'chucnang',
      render: (_: any, record: columns) => (
        <div className="flex justify-center items-center">
          <Button><AiFillEye className='text-xl text-[#4a89ff] cursor-pointer hover:text-white' /></Button>
          <Button className="ml-2 text-[#699af4db]" onClick={() => handleEdit(record?.key as string)}>Sửa</Button>
          <Popconfirm
            title="Xóa bài hát"
            description="Bạn chắc chắn muốn xóa chứ ?"
            onConfirm={() => confirm(record?.key as string)}
            okText="xóa"
            cancelText="Không"
            placement="topRight"
          >
            <Button className="ml-2" danger loading={loadingRemove}>Xóa</Button>
          </Popconfirm>
        </div>
      ),
      fixed: 'right',
      width: 150,
    },
  ]
  const skeletonItems = Array.from({ length: song.length === 0 || song.length > 10 ? 10 : song.length }, () => {
    return (
      <div className="mt-10 w-full">
        <Skeleton.Input active className="ml-2 max-h-4" size="large" style={{ borderRadius: '40px' }} />
        <Skeleton.Input active className="ml-2 max-h-4" size="small" style={{ borderRadius: '40px' }} />
        <Skeleton.Input active className="ml-2 max-h-4" size="large" style={{ borderRadius: '40px' }} />
        <Skeleton.Input active className="ml-2 max-h-4" size="small" style={{ borderRadius: '40px' }} />
        <Skeleton.Input active className="ml-2 max-h-4" size="large" style={{ borderRadius: '40px' }} />
        <Skeleton.Input active className="ml-2 max-h-4" size="small" style={{ borderRadius: '40px' }} />
        <Skeleton.Input active className="ml-2 max-h-4" size="small" style={{ borderRadius: '40px' }} />
      </div>
    )
  })



  return (

    <>
      <header className="fixed top-0 flex items-center w-[80%] justify-between">
        <span className="font-bold text-xl">Danh sách nhạc</span>
        <Input placeholder="Tìm kiếm bài hát" allowClear onChange={onChange} className="w-96" />
      </header>
      {loading ? skeletonItems : <Table dataSource={dataSource} columns={columns} pagination={false} className="mt-5 -ml-5 min-h-[550px]" scroll={{ x: 'calc(700px + 50%)', y: 560 }} />}
      <Pagination defaultCurrent={page} total={totalSong || 1} onChange={onChangePage} className="fixed bottom-6 right-10" />

    </>
  )
}
export default ListSong