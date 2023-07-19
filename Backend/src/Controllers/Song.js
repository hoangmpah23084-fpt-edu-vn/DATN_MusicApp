import { Validate_Song } from "../Schemas/Song";
import SongSchame from "../Models/Song";

export const createSong = async (req, res) => {
  try {
    const { error } = Validate_Song.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const data = await SongSchame.create(req.body);
    if (!data) {
      return res.status(400).json({
        message: "Create Song failed",
      });
    }
    console.log(data);
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
    const { error } = Validate_Song.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const data = await SongSchame.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
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
