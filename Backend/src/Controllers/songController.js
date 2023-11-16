import { Validate_Song } from "../Schemas/songSchemas.js";
import SongSchame from "../Models/songModel.js";
import Artist from "../Models/artistModel.js";
import Genre from "../Models/genreModel.js";

export const createSong = async (req, res) => {
  try {
    const body = req.body;
    const { error } = Validate_Song.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const data = await SongSchame.create(req.body);
    console.log(data);
    if (!data) {
      return res.status(400).json({
        message: "Create Song failed",
      });
    }
    /* update artist */
    await Artist.findByIdAndUpdate(
      data.id_Artists,
      {
        $addToSet: { songs: data._id },
      },
      { new: true }
    );
    //todo Update Genre
    await Genre.findByIdAndUpdate(
      data.id_Genre,
      {
        $addToSet: { list_song: data._id },
      },
      { new: true }
    );

    /* update genre */
    await Genre.findByIdAndUpdate(body.id_Genre, {
      $addToSet: { list_songs: data._id },
    });

    return res.status(200).json({
      message: "Create Song successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const get_Songs = async (req, res) => {
  try {
    const data = await SongSchame.find();
    return res.status(200).json({
      message: "Get song list Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const get_Song = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await SongSchame.findById(id);
    return res.status(200).json({
      message: "Get song list Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const update_Song = async (req, res) => {
  try {
    // const { error } = Validate_Song.validate(req.body, { abortEarly: false });
    // if (error) {
    //   return res.status(400).json({
    //     message: error.details[0].message,
    //   });
    // }
    const data = await SongSchame.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    /* update artist */
    //todo loai bỏ id song khỏi Artist
    await Artist.findByIdAndUpdate(data.id_Artists, {
      $pull: { songs: data._id },
    });
    const artistId = data.id_Artists;
    await Artist.findByIdAndUpdate(artistId, {
      $addToSet: { songs: data._id },
    });
    //todo loai bỏ id song khỏi genre
    await Genre.findByIdAndUpdate(data.id_Genre, {
      $pull: { list_songs: data._id },
    });
    const genreId = data.id_Genre;
    await Artist.findByIdAndUpdate(genreId, {
      $addToSet: { list_songs: data._id },
    });
    return res.status(200).json({
      message: "Updated song successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await SongSchame.findByIdAndDelete(id);
    if (!data) {
      return res.status(400).json({
        message: "Delete Song failed",
      });
    }

    /* delete song in artist */
    await Artist.findByIdAndUpdate(data.id_Artists, {
      $pull: { songs: data._id },
    });

    //todo  delete song in genre  */
    await Genre.findByIdAndUpdate(data.id_Genre, {
      $pull: { list_song: data._id },
    });

    return res.status(200).json({
      message: "Delete Song Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
