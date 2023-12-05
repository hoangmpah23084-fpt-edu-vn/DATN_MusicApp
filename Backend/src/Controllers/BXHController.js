import BXHSinger from "../Models/BXHSinger.js";
import Singer from "../Models/singer.js";
import songModel from "../Models/songModel.js";

const createBXHSinger = async (req, res) => {
  try {
    const data = await BXHSinger.create(req.body);
    return res.status(500).json({
      message: "Tạo BXH thành công",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getBXHSinger = async (req, res) => {
  try {
    const data = await BXHSinger.find();
    for (const item of data) {
      for (const itemBXH of item.BXHSinger) {
        let hollowArray = [];
        for (const iterator of itemBXH.songs) {
          const song = await songModel.findById(iterator);
          hollowArray = [...hollowArray, song];
        }
        itemBXH.songs = hollowArray;
        itemBXH.totalViewSinger = itemBXH.songs.reduce((total, curr) => {
          return total + curr.view_song;
        }, 0);
        item.BXHSinger.sort((a, b) => b.totalViewSinger - a.totalViewSinger);
      }
    }
    // const arrangeBXH = data;
    // console.log(data);

    return res.status(200).json({
      message: "Get BXH Successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export { createBXHSinger, getBXHSinger };
