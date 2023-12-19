import Genre from "../Models/genreModel.js";
import songModel from "../Models/songModel.js";
import { genreValidate } from "../Schemas/genreSchema.js";

export const create_Genre = async (req, res) => {
  try {
    const { error } = genreValidate.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const exitGenre = await Genre.findOne({ name: req.body.name });
    if (exitGenre) {
      return res.status(400).json({
        message: "Genre đã tồn tại",
      });
    }
    const data = await Genre.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Create Genre Failed" });
    }
    return res.status(200).json({
      message: "Tạo Genre thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getAll_Genre = async (req, res) => {
  try {
    const data = await Genre.find().populate("list_songs");
    if (!data) {
      return res.status(400).json({ message: "Get All Genre Failed" });
    }
    const filData = data.filter((item) => item.name != "un_genre");
    // const findData = filData.filter((item) => item.name == "TẤT CẢ");
    // console.log(filData);
    // filData.forEach((item) => {
    //   filData[0].list_songs = [...filData[0].list_songs, ...item.list_songs];
    // });
    filData.forEach((_, index) => {
      filData[index].list_songs = filData[index].list_songs.sort(
        (a, b) => b.view_song - a.view_song
      );
      // .slice(0, 9);
    });
    return res.status(200).json({
      message: "Get All Genre Success",
      data: filData,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const get_GenreById = async (req, res) => {
  try {
    const data = await Genre.findById(req.params.id).populate("list_songs");
    if (!data) {
      return res.status(400).json({ message: "Get Genre By Id Failed" });
    }
    data.list_songs = data.list_songs.sort((a, b) => b.view_song - a.view_song);
    // .slice(0, 9);
    return res.status(200).json({
      message: "Get Genre By Id Success",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const update_Genre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!genre) {
      return res.status(404).json({
        message: "Get Genre By Id Failed",
      });
    }
    return res.status(200).json({
      message: "Update Genre Success",
      data: genre,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const delete_Genre = async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findOne({ _id: id });
    //todo  Tìm và chuyển các sản phẩm liên quan sang danh mục "Uncategorized"
    const songsToUpdate = await songModel.find({ id_Genre: id });
    console.log("This Song in Genre");
    // console.log(songsToUpdate);
    //todo Tìm xem đã có danh mục Uncategorized trong db chưa
    const unGenre = await Genre.findOne({ name: "un_genre" });
    console.log(unGenre);
    //todo Cập nhật genreId của các sản phẩm thuộc genre đang chuẩn bị được xóa sang id của "UnGenre"
    if (unGenre) {
      await songModel.updateMany(
        { id_Genre: id }, //todo Điều kiện để tìm các sản phẩm cần cập nhật
        {
          id_Genre: unGenre._id,
        }
      );
      //todo Cập nhật mảng Song của danh mục "unGenre"
      await Genre.findByIdAndUpdate(unGenre._id, {
        $push: {
          list_songs: {
            $each: songsToUpdate.map((song) => song._id),
          },
        },
      });
    } else {
      //todo nếu chưa có Genre unGenre thì tạo mới
      const newUnGenre = Genre.create({ name: "un_genre" });

      //todo cập nhật các id_Genre của song thuộc Genre đang chuẩn bị xóa chuyển sang unGenre
      await songModel.updateMany(
        { id_Genre: id },
        { id_Genre: newUnGenre._id }
      );
      //todo Cập nhật mảng list_song của danh mục "un_genre"
      await Genre.findByIdAndUpdate(newUnGenre._id, {
        $push: {
          list_songs: {
            $each: songsToUpdate.map((song) => song._id),
          },
        },
      });
    }
    await Genre.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Delete category successfully!",
      genre,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
const deleteSongInGenre = () => { };
// const genre = await Genre.findByIdAndDelete(req.params.id);
