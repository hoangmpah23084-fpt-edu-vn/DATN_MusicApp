import Favourites from "../Models/songFavourites.js";
import SongSchame from "../Models/songModel.js";

//========= getFavourites ================

export const getFavourites = async (req, res) => {
  console.log(req.params.id_user);
  try {
    const list_songFavourites = await Favourites.findById(
      req.params.id_user
    ).populate("list_song_favourites");
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
    });
  }
};
//=================end Get =========================

//=================CreatFavourites =========================

export const createFavourites = async (req, res) => {
  const { id_user, id_song } = req.body; // lấy id_user và id_song từ request
  try {
    const checkFavourite = await Favourites.findOne({
      id_user: id_user,
      list_songFavourites: id_song,
    });
    if (checkFavourite) {
      const index = checkFavourite.list_songFavourites.findIndex((item) =>
        item.equals(id_song)
      );
      checkFavourite.list_songFavourites.splice(index, 1);
      await checkFavourite.save();
     await SongSchame.findOneAndUpdate(
      { id_song }, //tham số đầu tiên là id_user
      { $addToSet: { 
        total_like: total_like - 1,
        is_favourite:false
       }},
      { upsert: true, new: true } // này chưa biết là gì
    );
      return res.status(201).json({
        message: "Xóa yêu thích thành công",
        checkFavourite,
      });
    }
    // bắt đầu call API
    if (!checkFavourite) {
      const dataFavourite = await Favourites.findOneAndUpdate(
        { id_user }, //tham số đầu tiên là id_user
        { $addToSet: { list_songFavourites: id_song } },
        { upsert: true, new: true } // này chưa biết là gì
      );

     await SongSchame.findOneAndUpdate(
        { id_song }, //tham số đầu tiên là id_user
        { $addToSet: { 
          total_like: total_like + 1,
          is_favourite:true
         }},
        { upsert: true, new: true } // này chưa biết là gì
      );

      if (!dataFavourite) {
        return res.status(201).json({
          message: "Thêm không thành công",
        });
      }

      return res.status(201).json({
        message: "Thêm thành công",
        dataFavourite,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
