import genderModel from "../Models/genderModel.js";
import Genre from "../Models/genderModel.js";
import songModel from "../Models/songModel.js";
import { genreValidate } from "../Schemas/genderSchema.js";

export const create_Genre = async (req, res) => {
  try {
    const { error } = genreValidate.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const data = await Genre.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Create Genre Failed" });
    }
    return res.status(200).json({
      message: "Create Genre Success",
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
    const data = await Genre.find();
    if (!data) {
      return res.status(400).json({ message: "Get All Genre Failed" });
    }
    console.log(data);
    return res.status(200).json({
      message: "Get All Genre Success",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const get_GenreById = async (req, res) => {
  try {
    const data = await Genre.findById(req.params.id).populate("list_song");
    if (!data) {
      return res.status(400).json({ message: "Get Genre By Id Failed" });
    }
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
    const genre = await genderModel.findOne({ _id: id });
    //todo  Tìm và chuyển các sản phẩm liên quan sang danh mục "Uncategorized"
    const songsToUpdate = await songModel.find({ id_Genre: id });
    console.log(songsToUpdate);

    //todo Tìm xem đã có danh mục Uncategorized trong db chưa
    const unGenre = await genderModel.findOne({ genre_name: "un_genre" });
    //todo Cập nhật genreId của các sản phẩm thuộc genre đang chuẩn bị được xóa sang id của "UnGenre"
    if (unGenre) {
      await songModel.updateMany(
        { id_Genre: id }, //todo Điều kiện để tìm các sản phẩm cần cập nhật
        {
          id_Genre: unGenre._id,
        }
      );
      //todo Cập nhật mảng Song của danh mục "unGenre"
      await genderModel.findByIdAndUpdate(unGenre._id, {
        $push: {
          list_song: {
            $each: songsToUpdate.map((song) => song._id),
          },
        },
      });
    } else {
      //todo nếu chưa có Genre unGenre thì tạo mới
      const newUnGenre = genderModel.create({ genre_name: "un_genre" });

      //todo cập nhật các id_Genre của song thuộc Genre đang chuẩn bị xóa chuyển sang unGenre
      await songModel.updateMany(
        { id_Genre: id },
        { id_Genre: newUnGenre._id }
      );
      //todo Cập nhật mảng list_song của danh mục "un_genre"
      await genderModel.findByIdAndUpdate(newUnGenre._id, {
        $push: {
          list_song: {
            $each: songsToUpdate.map((song) => song._id),
          },
        },
      });
    }
    await genderModel.findByIdAndDelete(id);
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
// const genre = await Genre.findByIdAndDelete(req.params.id);
