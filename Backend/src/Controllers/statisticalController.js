import Song from "../Models/songModel.js";
import Album from "../Models/albumModel.js";
import User from "../Models/model_user.js";

export const statistical = async (req, res) => {
    try {
        const listSong = await Song.find();
        const listAlbum = await Album.find();
        const listUser = await User.find();
        const totalSong = listSong.length || 0
        const totalAlbum = listAlbum.length || 0
        const totalUser = listUser.length || 0
        const today = new Date();
        const monthYear = `${today.getFullYear()}-${Number(today.getMonth()) + 1}`;

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
                totalUser
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
