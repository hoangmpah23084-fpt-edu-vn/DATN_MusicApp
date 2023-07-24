import Artist from "../Models/artistModel.js";
import ArtistValidate from "../Schemas/artistSchema.js";

const getArtists = async (req, res) => {
  try {
    const data = await Artist.find({});
    if (!data) {
      return res.status(404).send({ message: "fail", error: "Loi" });
    }
    return res.status(200).send({ message: "success", data: data });
  } catch (error) {
    return res.status(500).send({ message: "fail", error: "Loi he thong" });
  }
};

const createArtist = async (req, res) => {
  try {
    const body = req.body;
    /* validate */
    const { error } = ArtistValidate.validate(body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    /* create */
    const artist = await Artist.create(body);
    if (!artist) {
      return res.status(400).json({ message: "Create artist failed" });
    }
    return res.status(201).json({ data: artist });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Artist.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res
        .status(404)
        .send({ message: "fail", error: "Khong tim thay artist de update" });
    }
    return res.status(200).send({ message: "success", data: data });
  } catch (error) {
    return res.status(500).send({ message: "fail", error: error });
  }
};

const deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Artist.findByIdAndDelete(id);
    if (!data) {
      return res
        .status(404)
        .send({ message: "fail", error: "Khong tim thay artist de delete" });
    }
    return res.status(200).send({ message: "success", data: data });
  } catch (error) {
    return res.status(500).send({ message: "fail", error: error });
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Artist.findById(id);
    if (!data) {
      return res
        .status(404)
        .send({ message: "fail", error: "Khong tim thay artist " });
    }
  } catch (error) {
    return res.status(500).send({ message: "fail", error: error });
  }
};

export default {
  getArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  getItem,
};
