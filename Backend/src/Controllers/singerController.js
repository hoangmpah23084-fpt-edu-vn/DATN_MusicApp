import Singer from "../Models/singer.js";
import SingerValidate from "../Schemas/singerSchema.js";
import BXHSinger from "../Models/BXHSinger.js";

export const getSingers = async (req, res) => {
  try {
    const data = await Singer.find().populate("album").populate("songs");
    const date = new Date();
    const currentMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const BXH = await BXHSinger.findOne({ time: currentMonth });
    if (BXH) {
      console.log(BXH);
      await BXHSinger.findByIdAndUpdate(
        { _id: BXH._id },
        {
          $addToSet: { BXHSinger: data },
        },
        {
          new: true,
        }
      );
    } else {
      await BXHSinger.create({
        time: currentMonth,
        BXHSinger: data,
      });
    }
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

// if (dataBXH.length > 0) {
//   for (const iterator of dataBXH) {
//     if (iterator.time.localeCompare(currentMonth)) {
//       console.log(true);
//       await BXHSingerModel.create({
//         time: currentMonth,
//         BXHSinger: data,
//       });
//     } else {
//     }
//   }
// } else if (dataBXH.length == 0) {
//   await BXHSingerModel.create({
//     time: currentMonth,
//     BXHSinger: data,
//   });
// }
