import Favourites from "../Models/songFavourites";

//========= getFavourites ================

export const getFavourites = async (req, res) => {
    try {
        const list_songFavourites = await Favourites.findOne({ id_user: req.params.id_user }).populate('list_songFavourites.id_song')
        // truy cập vào bảng Favourites điều kiện id_user ? truy cập vào list_songFavourites để lấy id_song : catch

        if (!list_songFavourites) {
            return res.status(201).json({
                message: "Danh sách không tồn tại",
            });
        }
        return res.status(201).json({
            message: "Danh sách Favourites",
            list_songFavourites,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
            // gửi error 
        });
    }
}

//=================end Get =========================

//=================CreatFavourites =========================

export const createFavourites = async (req, res) => {

    const { id_user, id_song } = req.body; // lấy id_user và id_song từ request

    // tạo 1 object có chưa id_bài hát để cập nhật lại danh sách
    const list_songFavourite = {
        id_song,
    }
    try {
        // bắt đầu call API
        const dataFavourite = await Favourites.findOneAndUpdate(
            { id_user }, //tham số đầu tiên là id_user
            { $addToSet: { list_songFavourites: list_songFavourite } }, // tham số thứ 2 dùng addToset để add list_songFavourite vào list_songFavourites
            { upsert: true, new: true } // này chưa biết là gì 
        )

        if (!dataFavourite) {
            return res.status(201).json({
                message: "Thêm không thành công"
            })
        }

        return res.status(201).json({
            message: "Thêm thành công",
            dataFavourite
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }

}