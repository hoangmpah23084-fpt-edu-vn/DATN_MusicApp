import { Validate_Song } from "../Schemas/songSchemas.js";
import SongSchame from "../Models/songModel.js";
import Singer from "../Models/singer.js";
import Genre from "../Models/genreModel.js";
import Album from "../Models/albumModel.js";
import playlistModal from "../Models/playlistModal.js";

export const createSong = async (req, res) => {
  try {
    const body = req.body;
    const { error } = Validate_Song.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    console.log(2);
    const data = await SongSchame.create(req.body);
    console.log(1);
    if (!data) {
      return res.status(400).json({
        message: "Create Song failed",
      });
    }
    /* update artist */
    await Singer.findByIdAndUpdate(
      data.id_Singer,
      {
        $addToSet: { songs: data._id },
      },
      { new: true }
    );
    //todo Update Genre
    await Genre.findByIdAndUpdate(
      data.id_Genre,
      {
        $addToSet: { list_songs: data._id },
      },
      { new: true }
    );
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
  const {
    _limit = 10,
    _page = 1,
    search,
    _sort = "total_like",
    _order = "asc",
  } = req.query;
  const options = {
    limit: _limit,
    page: _page,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
    populate: ["id_Singer", "id_Genre"],
  };
  try {
    let query = {};
    if (search) {
      query = {
        $or: [{ song_name: { $regex: search, $options: "i" } }],
      };
    }
    const data = await SongSchame.paginate(query, options);
    const total = await SongSchame.find();
    return res.status(200).json({
      message: "Get song list Successfully",
      totalSongList: total.length,
      data: data.docs,
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
    //todo xóa song ở Genre cũ
    const findSong = await SongSchame.findById(req.params.id);
    await Genre.findByIdAndUpdate(findSong.id_Genre, {
      $pull: { list_songs: findSong._id },
    });
    const data = await SongSchame.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    /* update artist */
    //todo loai bỏ id song khỏi Artist
    await Singer.findByIdAndUpdate(data.id_Singer, {
      $pull: { songs: data._id },
    });
    const SingerId = data.id_Singer;
    await Singer.findByIdAndUpdate(SingerId, {
      $addToSet: { songs: data._id },
    });
    //todo loai bỏ id song khỏi genre
    // console.log(data);
    console.log("1");
    await Genre.findByIdAndUpdate(data.id_Genre, {
      $addToSet: { list_songs: data._id },
    });
    // const genreId = data.id_Genre;
    // await Artist.findByIdAndUpdate(genreId, {
    //   $addToSet: { list_songs: data._id },
    // });
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

    // /* delete song in artist */
    await Singer.findByIdAndUpdate(data.id_Singer, {
      $pull: { songs: data._id },
    });

    // //todo  delete song in genre  */
    await Genre.findByIdAndUpdate(data.id_Genre, {
      $pull: { list_song: data._id },
    });
    //todo  delete album in genre  */
    const albumlist = await Album.find().populate("list_song");
    const mapdata = albumlist.map(async (item) => {
      console.log(item._id);
      const dataListSong = item.list_song.filter((item) => item._id == id);
      console.log(dataListSong);
      if (dataListSong.length > 0) {
        await Album.findByIdAndUpdate(item._id, {
          $pull: { list_song: id },
        });
      }
    });
    const playlist = await playlistModal.find().populate("list_song");
    const mapdataPlayList = playlist.map(async (item) => {
      console.log(item._id);
      const dataListSong = item.list_song.filter((item) => item._id == id);
      console.log(dataListSong);
      if (dataListSong.length > 0) {
        await playlistModal.findByIdAndUpdate(item._id, {
          $pull: { list_song: id },
        });
      }
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

export const updateViewSong = async (req, res) => {
  const id_song = req.params.id;
  let setMonth = {};
  const today = new Date();
  const month = `${today.getFullYear()}-${Number(today.getMonth()) + 1}`;
  const songCurrent = await SongSchame.findOne({ _id: id_song });
  if (songCurrent?.month.includes(month)) {
    const getMonth = JSON.parse(songCurrent.month);
    for (const item in getMonth) {
      if (item == month) {
        setMonth = {
          ...getMonth,
          [item]: getMonth[item] + 1,
        };
      }
    }
  } else {
    const getMonth = JSON.parse(songCurrent.month);
    setMonth = {
      ...getMonth,
      [month]: 1,
    };
  }
  if (!songCurrent) {
    return res.status(401).json({
      message: "Không thành công",
    });
  } else {
    await SongSchame.findOneAndUpdate(
      { _id: id_song },
      {
        month: JSON.stringify(setMonth),
        view_song: songCurrent.view_song + 1,
      },
      { upsert: true, new: true }
    );
    return res.status(201).json({
      message: "Thành công",
      data: songCurrent,
    });
  }
};
