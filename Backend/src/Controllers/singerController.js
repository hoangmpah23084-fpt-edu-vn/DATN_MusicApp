import SongSchame from "../Models/songModel.js";
import Singer from "../Models/singer.js";
import Genre from "../Models/genreModel.js";
import SingerValidate from "../Schemas/singerSchema.js";

export const getSingers = async (req, res) => {
  try {
    const data = await Singer.find().populate("songs");

    console.log(data);
    if (!data) {
      return res.status(404).send({ message: "fail", error: "Loi" });
    }
    return res.status(200).send({ message: "success", data: data });
  } catch (error) {
    return res.status(500).send({ message: "fail", error: "Loi he thong" });
  }
};

export const createSinger = async (req, res) => {
  try {
    const body = req.body;
    /* validate */
    const { error } = SingerValidate.validate(body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    /* create */
    const Singerdata = await Singer.create(body);
    if (!Singerdata) {
      return res.status(400).json({ message: "Create Singer failed" });
    }
    return res.status(201).json({ data: Singerdata });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateSinger = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Singer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res
        .status(404)
        .send({ message: "fail", error: "Khong tim thay Singer de update" });
    }
    return res.status(200).send({ message: "success", data: data });
  } catch (error) {
    return res.status(500).send({ message: "fail", error: error });
  }
};

export const deleteSinger = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Singer.findByIdAndDelete(id);
    if (!data) {
      return res
        .status(404)
        .send({ message: "fail", error: "Khong tim thay Singer de delete" });
    }
    return res.status(200).send({ message: "success", data: data });
  } catch (error) {
    return res.status(500).send({ message: "fail", error: error });
  }
};

export const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Singer.findById(id).populate("songs");
    const singerSongs = await SongSchame.populate(data.songs, {
      path: "id_Singer",
      model: Singer,
      select: "name",
    });
    const genreSongs = await SongSchame.populate(singerSongs, {
      path: "id_Genre",
      model: Genre,
      select: "name",
    });
    data.songs = genreSongs;

    console.log(data);
    if (!data) {
      return res
        .status(404)
        .send({ message: "fail", error: "Khong tim thay Singer " });
    }
    return res.status(200).json({
      message: "Get data successfully",
      data,
    });
  } catch (error) {
    return res.status(500).send({ message: "fail", error: error });
  }
};
