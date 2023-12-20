import Song from "../Models/songModel.js";
import Album from "../Models/albumModel.js";
import User from "../Models/model_user.js";
import Singer from '../Models/singer.js'
import moment from 'moment'

export const statistical = async (req, res) => {
    try {
        const listSong = await Song.find();
        const listAlbum = await Album.find();
        const listUser = await User.find();
        const listSinger = await Singer.find();
        const totalSong = listSong.length || 0
        const totalAlbum = listAlbum.length || 0
        const totalUser = listUser.length || 0
        const totalSinger = listSinger.length || 0
        const today = new Date();
        let monthYear = '';


        if (today.getMonth() == 0) {
            monthYear = `${today.getFullYear() - 1}-12`
        }
        else {
            monthYear = `${today.getFullYear()}-${Number(today.getMonth())}`
        }
        if (req.body?.time) {
            monthYear = req.body.time
        }

        const fomartListSong = listSong.map((item) => {
            const { month, ...rest } = item;
            return {
                ...item._doc,
                view: JSON.parse(month)[monthYear] || 0,
            };
        });

        fomartListSong.sort(function (a, b) {
            return Number(JSON.parse(b.view)) - Number(JSON.parse(a.view));
        });

        const ratingSong = fomartListSong.filter((item, index) => index < 10)
        return res.status(200).json({
            data: {
                ratingSong,
                totalSong,
                totalAlbum,
                totalUser,
                totalSinger
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};


export const monthSong = async (req, res) => {
    try {
        const listSong = await Song.find().populate('id_Genre').populate('id_Singer')

        // Ngày bắt đầu và kết thúc của khoảng thời gian
        const lastMonth = moment().clone().subtract(1, 'month');

        const startMonth = lastMonth.clone().startOf('month').format('YYYY-MM-DD')
        const endMonth = lastMonth.clone().endOf('month').format('YYYY-MM-DD')

        // Kiểm tra xem targetDate có nằm trong khoảng thời gian không
        const newData = listSong.filter((item) => moment(item.createdAt).format('YYYY-MM-DD') <  endMonth &&  startMonth < moment(item.createdAt).format('YYYY-MM-DD'))

        return res.json({
            message: "Danh sách bài hát mới thêm trong tháng",
            data: {
                itemCount: newData.length || 0,
                items: newData
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}

export const monthUser = async (req, res) => {
    try {
        const listUser = await User.find();
         // Ngày bắt đầu và kết thúc của khoảng thời gian
         const lastMonth = moment().clone().subtract(1, 'month');

         const startMonth = lastMonth.clone().startOf('month').format('YYYY-MM-DD')
         const endMonth = lastMonth.clone().endOf('month').format('YYYY-MM-DD')

        // Kiểm tra xem targetDate có nằm trong khoảng thời gian không
        const newData = listUser.filter((item) => moment(item.createdAt).format('YYYY-MM-DD') <  endMonth &&  startMonth < moment(item.createdAt).format('YYYY-MM-DD'))
        return res.json({
            message: "Danh sách người đăng ký mới trong tháng",
            data: {
                itemCount: newData.length || 0,
                items: newData
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}