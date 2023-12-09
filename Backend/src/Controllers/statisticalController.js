import Song from "../Models/songModel.js";
import Album from "../Models/albumModel.js";
import User from "../Models/model_user.js";
import Singer from '../Models/singer.js'

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

        console.log("monthYear", monthYear)



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
