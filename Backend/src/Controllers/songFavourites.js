import Favourites from "../Models/songFavourites";

//========= getFavourites ================

export const getFavourites = async () => {
    id_user = req.params.id_user // lấy ra id của user từ req
    try {
        const list_songFavourites = await Favourites.findOne({ id_user }).populate('list_songFavourites.id_song')
        // truy cập vào bảng Favourites điều kiện id_user ? truy cập vào list_songFavourites để lấy id_song : catch
        return res.status(200).json({
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